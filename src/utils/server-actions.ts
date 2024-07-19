"use server";

import sharp from "sharp";
import { z } from "zod";
import { createMetadataSchema } from "@/schema/schema";
import { MetadataSchema, MetadataWithIdSchema } from "@/schema/schema";

import { auth } from "@/auth";
import { log } from "@/utils/server-utils";
import { createOriginBuffer } from "@/utils/server-utils";
import { createThumbnailBuffer } from "@/utils/server-utils";

import { createMetadata, createOrigins, createThumbnails } from "@/data/table";
import { getMetadataIDs, getMetadataNames, getAllMetadata } from "@/data/table";
import { deleteMetadata } from "@/data/table";

/**
 * 驗證相關的元數據並上傳圖片。
 * @returns 成功時回傳 undefined，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function uploadImages(
  data: z.infer<typeof MetadataSchema>,
  filesFormdata: FormData
) {
  log("ACTION", "Uploading images");

  try {
    const session = await auth();
    if (!session) {
      return { error: ["Authentication required to upload files."] };
    }

    const existingNames = await getMetadataNames();
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

    //
    // 檢查所有檔案是否有效
    const files = Array.from(filesFormdata.values()) as File[];

    if (!files.every((file) => file instanceof File)) {
      return { error: ["Invalid files."] };
    }

    if (files.length !== data.fieldArray.length) {
      return { error: ["Number of files does not match number of fields."] };
    }

    //
    // 創建圖像資料
    const arrayBuffers = await Promise.all(
      files.map((file) => file.arrayBuffer())
    );
    const images = await Promise.all(
      arrayBuffers.map((buffer) => sharp(buffer))
    );

    const dimmensions = await Promise.all(
      images.map(async (image) => {
        const metadata = await image.metadata();
        return { width: metadata.width, height: metadata.height };
      })
    );

    if (
      !dimmensions.every(
        ({ width, height }) =>
          width && height && width >= 1080 && height >= 1080
      )
    ) {
      return { error: ["All images must be at least 1080x1080."] };
    }

    const [bufferO, bufferT] = await Promise.all([
      Promise.all(images.map((image) => createOriginBuffer(image))),
      Promise.all(images.map((image) => createThumbnailBuffer(image))),
    ]);

    //
    // 上傳加上大小的圖片元數據
    const metadataList = data.fieldArray.map((metadata, i) => ({
      ...metadata,
      size: bufferO[i].byteLength + bufferT[i].byteLength,
    }));

    const metadataIDs = await createMetadata(metadataList);

    //
    // 上傳原始圖片和縮略圖
    const originList = bufferO.map((buffer, i) => ({
      metadataId: metadataIDs[i],
      bytes: buffer,
    }));

    const thumbnailList = bufferT.map((buffer, i) => ({
      metadataId: metadataIDs[i],
      bytes: buffer,
    }));

    await Promise.all([
      createOrigins(originList),
      createThumbnails(thumbnailList),
    ]);
  } catch (error) {
    console.error(`Error: ${error}`);
    return { error: ["Something went wrong"] };
  }

  return;
}

/**
 * 更新圖片資料。
 * @returns 成功時回傳 undefined，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function updateImages(data: z.infer<typeof MetadataWithIdSchema>) {
  log("ACTION", "Updating images");

  try {
    const session = await auth();
    if (!session) {
      return { error: ["Authentication required to modify files."] };
    }

    const existingMetadata = await getAllMetadata();
    const uploadIds = data.fieldArray.map(({ cuid }) => cuid);
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

    const metadataList = data.fieldArray;
    const existingIds = await getMetadataIDs();
    if (!metadataList.every(({ cuid }) => existingIds.includes(cuid))) {
      return { error: ["Some ids do not exist."] };
    }

    console.log(`updateImages: metadataList`);
    console.log(metadataList);

    // TODO: update metadata
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
    const session = await auth();
    if (!session) {
      return { error: ["Authentication required to delete files."] };
    }

    const existingIds = await getMetadataIDs();
    if (!ids.every((id) => existingIds.includes(id))) {
      return { error: ["Some ids do not exist."] };
    }

    await deleteMetadata(ids);
  } catch (error) {
    return { error: ["Something went wrong"] };
  }

  return;
}
