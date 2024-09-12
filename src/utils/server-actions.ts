"use server";

import sharp from "sharp";
import { z } from "zod";
import { createMetadataSchema } from "@/schema/metadataSchema";
import { MetadataSchema, MetadataWithIdSchema } from "@/schema/metadataSchema";
import { exploreSchema } from "@/schema/exploreSchema";

import { encryptImage, validateSession } from "@/auth";
import { createOriginBuffer } from "@/utils/server-utils";
import { createThumbnailBuffer } from "@/utils/server-utils";

import { getAllMetadata, getMetadataByGroup } from "@/data/metadata";
import { getAllGroups, createMetadata } from "@/data/metadata";
import { deleteMetadata, updateMetadata } from "@/data/metadata";
import { createExploreMetadata, deleteExploreMetadata } from "@/data/metadata";
import { updateExploreMetadata } from "@/data/metadata";
import { createThumbnails } from "@/data/thumbnail";
import { createOrigins } from "@/data/origin";

import { verifyAllCategory, summaryCategorySize } from "@/data/verify";
import { verifyAllOrigin, verifyAllThumbnail } from "@/data/verify";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * 驗證上傳的圖片元數據。
 * @returns 成功時回傳 undefined，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function verifyUpload(data: z.infer<typeof MetadataSchema>) {
  try {
    const session = await validateSession({ redirect: false });
    if (!session) {
      return { error: ["Authentication required to upload files."] };
    }

    const existingNames = (await getAllMetadata({ name: true })).map(
      ({ name }) => name
    );
    const schema = createMetadataSchema(existingNames);
    const result = schema.safeParse(data);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => {
        const { path, message } = issue;
        const index = path[1] as number;
        const field = path[2] as string;
        return `"${message}" in image ${index + 1} at field "${field}"`;
      });

      return { error: errorMessages };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: [error.message] };
    }

    return { error: ["Something went wrong"] };
  }
}

/**
 * 上傳單張圖片。
 * @returns 成功時回傳 undefined，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function uploadImage(
  metadata: z.infer<typeof MetadataSchema>["fieldArray"][number],
  fileData: FormData
) {
  try {
    const session = await validateSession({ redirect: false });
    if (!session) {
      return { error: ["Authentication required to upload files."] };
    }

    //
    // 檢查檔案是否有效，創建圖像資料
    const file = fileData.get("file");
    if (!file || !(file instanceof File) || !file.type.startsWith("image/")) {
      return { error: ["Invalid files."] };
    }

    const arrayBuffer = await file.arrayBuffer();
    const image = sharp(arrayBuffer);
    const [_bufferO, bufferT] = await Promise.all([
      createOriginBuffer(image),
      createThumbnailBuffer(image),
    ]);

    const result = await encryptImage(_bufferO);
    if ("error" in result) return { error: [result.error] };
    const bufferO = result;

    //
    // 上傳加上大小的圖片元數據與圖片
    const [id] = await createMetadata([
      { ...metadata, size: bufferO.byteLength + bufferT.byteLength },
    ]);

    const listO = [{ metadataId: id, bytes: bufferO }];
    const listT = [{ metadataId: id, bytes: bufferT }];
    await Promise.all([createOrigins(listO), createThumbnails(listT)]);

    revalidatePath("/");
    return { success: ["File uploaded successfully."] };
  } catch (error) {
    if (error instanceof Error) {
      return { error: [error.message] };
    }

    return { error: ["Something went wrong"] };
  }
}

/**
 * 更新圖片資料。
 * @returns 成功時回傳 undefined，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function updateImages(data: z.infer<typeof MetadataWithIdSchema>) {
  try {
    const session = await validateSession({ redirect: false });
    if (!session) {
      return { error: ["Authentication required to modify files."] };
    }

    //
    // 排除正在上傳的圖片的名稱來創建Schema (使互換名稱或名稱欄位不更改成為可能)
    const { fieldArray } = data;
    const existingMetadata = await getAllMetadata({ id: true, name: true });
    const uploadIds = fieldArray.map(({ cuid }) => cuid);

    const existingIds = existingMetadata.map(({ id }) => id);
    if (!uploadIds.every((id) => existingIds.includes(id))) {
      return { error: ["Some ids do not exist."] };
    }

    const dbNames = existingMetadata
      .filter(({ id }) => !uploadIds.includes(id))
      .map(({ name }) => name);

    const schema = createMetadataSchema(dbNames);
    const result = schema.safeParse(data);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => {
        const { path, message } = issue;
        const index = path[1] as number;
        const field = path[2] as string;
        return `"${message}" in image ${index + 1} at field "${field}"`;
      });

      return { error: errorMessages };
    }

    //
    // 更新圖片資料
    const metadataList = fieldArray.map(({ cuid, ...metadata }) => ({
      id: cuid,
      ...metadata,
    }));
    await updateMetadata(metadataList);
  } catch (error) {
    if (error instanceof Error) {
      return { error: [error.message] };
    }

    return { error: ["Something went wrong"] };
  }

  return;
}

/**
 * 刪除圖片資料。
 * @returns 成功時回傳 undefined，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function deleteImages(ids: string[]) {
  try {
    const session = await validateSession({ redirect: false });
    if (!session) {
      return { error: ["Authentication required to delete files."] };
    }

    const existingIds = (await getAllMetadata({ id: true })).map(
      ({ id }) => id
    );

    if (!ids.every((id) => existingIds.includes(id))) {
      return { error: ["Some ids do not exist."] };
    }

    await deleteMetadata(ids);
    revalidatePath("/");
    return;
  } catch (error) {
    if (error instanceof Error) {
      return { error: [error.message] };
    }

    return { error: ["Something went wrong"] };
  }
}

/**
 * 驗證圖片庫完整性。
 * @returns 成功時回傳一個包含完整性檢查結果的物件，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function verifyIntegrity() {
  try {
    const session = await validateSession({ redirect: false });
    if (!session) {
      return { error: ["Authentication required to verify integrity."] };
    }

    const [countC, countT, countO, summary] = await Promise.all([
      verifyAllCategory(),
      verifyAllThumbnail(),
      verifyAllOrigin(),
      summaryCategorySize(),
    ]);

    return {
      success: {
        category: countC === 0 ? "PASS" : "FAIL",
        thumbnail: countT === 0 ? "PASS" : "FAIL",
        origin: countO === 0 ? "PASS" : "FAIL",
        summary,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: [error.message] };
    }

    return { error: ["Something went wrong"] };
  }
}

/**
 * 用於上傳或更新explore project的驗證。
 */
async function validateProject(data: z.infer<typeof exploreSchema>) {
  // 基本檢查
  const result = exploreSchema.safeParse(data);
  if (!result.success) {
    const errorMessages = result.error.issues.map((issue) => {
      const { path, message } = issue;
      return `"${message}" at field "${path.join(".")}"`;
    });

    return { error: errorMessages };
  }

  // 獲取檢查所需的數據
  const [groups, metadataList] = await Promise.all([
    getAllGroups(),
    getMetadataByGroup(data.project),
  ]);

  // 檢查project name
  const { allGroups, avalibleGroups } = groups;
  if (!allGroups.includes(data.project)) {
    return { error: ["Group does not exist."] };
  }

  // 檢查metadataId是否存在，並且數量是否等於該group的metadata數量
  const metadataIds = data.imageFields.map(({ metadataId }) => metadataId);
  const groupIds = metadataList.map(({ id }) => id);
  if (!metadataIds.every((id) => groupIds.includes(id))) {
    return { error: ["Some image do not exist."] };
  }
  if (metadataIds.length !== groupIds.length) {
    return { error: ["Some image are missing."] };
  }

  // imageFields的@@unique([tag, camera, detail])約束
  const detail = data.description;
  const uniqueFields = new Set();
  for (const { tag, camera } of data.imageFields) {
    const key = `${tag}-${camera}-${detail}`;
    if (uniqueFields.has(key)) {
      return { error: ["Duplicate image fields."] };
    }

    uniqueFields.add(key);
  }

  if (!avalibleGroups.includes(data.project)) {
    return { type: "update", metadataList };
  }

  return { type: "create" };
}

/**
 * 上傳或更新新explore project
 * @returns 成功時redirect，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function uploadProject(data: z.infer<typeof exploreSchema>) {
  try {
    const session = await validateSession({ redirect: false });
    if (!session) {
      return { error: ["Authentication required to upload files."] };
    }

    const result = await validateProject(data);
    if (result.error) return result;

    if (result.type === "create") {
      await createExploreMetadata(
        data.imageFields.map((field) => ({
          detail: data.description,
          tag: field.tag,
          camera: field.camera,
          metadataId: field.metadataId,
        }))
      );
    }

    if (result.type === "update" && result.metadataList) {
      await updateExploreMetadata(
        data.imageFields.map((field) => {
          const metadata = result.metadataList.find(
            ({ id }) => id === field.metadataId
          );

          if (!metadata || !metadata.explore)
            throw new Error("Something went wrong");

          return {
            id: metadata.explore.id,
            detail: data.description,
            tag: field.tag,
            camera: field.camera,
            metadataId: field.metadataId,
          };
        })
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: [error.message] };
    }

    return { error: ["Something went wrong"] };
  }

  redirect("/files/projects");
}

/**
 * 刪除explore project
 * @returns 成功時回傳 undefined，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function deleteProject(project: string) {
  try {
    const session = await validateSession({ redirect: false });
    if (!session) {
      return { error: ["Authentication required to delete files."] };
    }

    // 檢查project是否存在
    const metadataList = await getMetadataByGroup(project);
    if (metadataList.length === 0) {
      return { error: ["Project does not exist."] };
    }

    // 檢查該group下的每張圖片是否都有explore metadata
    const exploreIds = metadataList.map(({ explore }) => explore?.id);
    if (!exploreIds.every((id) => typeof id === "string")) {
      return { error: ["Some images are not in the project."] };
    }

    await deleteExploreMetadata(exploreIds);
  } catch (error) {
    if (error instanceof Error) {
      return { error: [error.message] };
    }

    return { error: ["Something went wrong"] };
  }
}
