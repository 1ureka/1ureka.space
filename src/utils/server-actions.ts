"use server";

import sharp from "sharp";
import { z } from "zod";
import { createMetadataSchema, MetadataSchema } from "@/schema/schema";

import { auth } from "@/auth";
import { log } from "@/utils/server-utils";

import { createMetadata, createOrigins, createThumbnails } from "@/data/table";
import { getMetadataIDs, getMetadataNames } from "@/data/table";
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

    const files = Array.from(filesFormdata.values()) as File[];

    if (!files.every((file) => file instanceof File)) {
      return { error: ["Invalid files."] };
    }

    if (files.length !== data.fieldArray.length) {
      return { error: ["Number of files does not match number of fields."] };
    }

    const arrayBuffers = await Promise.all(
      files.map((file) => file.arrayBuffer())
    );

    const bufferO = await Promise.all(
      arrayBuffers.map((arrayBuffer) =>
        sharp(Buffer.from(arrayBuffer))
          .webp({ quality: 100, effort: 6 })
          .toBuffer()
      )
    );

    const bufferT = await Promise.all(
      arrayBuffers.map((arrayBuffer) =>
        sharp(Buffer.from(arrayBuffer))
          .resize(480, 270, { fit: "cover" })
          .webp({ quality: 50, effort: 6 })
          .toBuffer()
      )
    );

    const metadataList = data.fieldArray.map((metadata, i) => ({
      ...metadata,
      size: bufferO[i].byteLength + bufferT[i].byteLength,
    }));

    const metadataIDs = await createMetadata(metadataList);

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
export async function updateImages(
  data: z.infer<typeof MetadataSchema>,
  metadataIDs: string[]
) {
  log("ACTION", "Updating images");

  try {
    const session = await auth();
    if (!session) {
      return { error: ["Authentication required to modify files."] };
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

    const existingIds = await getMetadataIDs();
    if (!metadataIDs.every((id) => existingIds.includes(id))) {
      return { error: ["Some ids do not exist."] };
    }

    // TODO
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
