"use server";

import sharp from "sharp";
import { z } from "zod";
import { createMetadataSchema } from "@/schema/metadataSchema";
import { MetadataSchema, MetadataWithIdSchema } from "@/schema/metadataSchema";

import { validateUserSession } from "@/auth";
import { log } from "@/utils/server-utils";
import { createOriginBuffer } from "@/utils/server-utils";
import { createThumbnailBuffer } from "@/utils/server-utils";

import { createMetadata, createOrigins, createThumbnails } from "@/data/table";
import { getAllMetadata, deleteMetadata, updateMetadata } from "@/data/table";

import { verifyAllCategory, summaryCategorySize } from "@/data/table";
import { verifyAllOrigin, verifyAllThumbnail } from "@/data/table";

/**
 * 驗證上傳的圖片元數據。
 * @returns 成功時回傳 undefined，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function verifyUpload(data: z.infer<typeof MetadataSchema>) {
  log("ACTION", "Verifying upload");

  try {
    const session = await validateUserSession({ isRedirect: false });
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
    console.error(`Error: ${error}`);
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
  log("ACTION", "Uploading images");

  try {
    const session = await validateUserSession({ isRedirect: false });
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
    const [bufferO, bufferT] = await Promise.all([
      createOriginBuffer(image),
      createThumbnailBuffer(image),
    ]);

    //
    // 上傳加上大小的圖片元數據與圖片
    const metadataWithSize = {
      ...metadata,
      size: bufferO.byteLength + bufferT.byteLength,
    };

    const [id] = await createMetadata([metadataWithSize]);

    const listO = [{ metadataId: id, bytes: bufferO }];
    const listT = [{ metadataId: id, bytes: bufferT }];

    await Promise.all([createOrigins(listO), createThumbnails(listT)]);

    return { success: ["File uploaded successfully."] };
  } catch (error) {
    console.error(`Error: ${error}`);
    return { error: ["Something went wrong"] };
  }
}

/**
 * 更新圖片資料。
 * @returns 成功時回傳 undefined，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function updateImages(data: z.infer<typeof MetadataWithIdSchema>) {
  log("ACTION", "Updating images");

  try {
    const session = await validateUserSession({ isRedirect: false });
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
    return { error: ["Something went wrong"] };
  }

  return;
}

/**
 * 刪除圖片資料。
 * @returns 成功時回傳 undefined，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function deleteImages(ids: string[]) {
  log("ACTION", "Deleting images");

  try {
    const session = await validateUserSession({ isRedirect: false });
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
  } catch (error) {
    return { error: ["Something went wrong"] };
  }

  return;
}

/**
 * 驗證圖片庫完整性。
 * @returns 成功時回傳一個包含完整性檢查結果的物件，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function verifyIntegrity() {
  log("ACTION", "Verifying integrity");

  try {
    const session = await validateUserSession({ isRedirect: false });
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
    return { error: ["Something went wrong"] };
  }
}
