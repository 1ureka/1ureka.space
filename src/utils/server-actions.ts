"use server";

import { auth } from "@/auth";
import { z } from "zod";
import { createMetadataSchema, MetadataSchema } from "@/schema/schema";

import sharp from "sharp";
import { log } from "@/utils/server-utils";
import { getMetadataNames } from "@/data/table";

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
    if (!session)
      return { error: ["Authentication required to upload files."] };

    const existingNames = await getMetadataNames();
    const schema = createMetadataSchema(existingNames);
    const result = schema.safeParse(data);

    if (!result.success) {
      const { issues } = result.error;

      const errorMessages = issues.map((issue) => {
        const { path, message } = issue;
        const index = path[1] as number;
        const field = path[2] as string;
        return `"${message}" in image ${index + 1} at field "${field}"`;
      });

      return { error: errorMessages };
    }

    const files = Array.from(filesFormdata.values()).filter(
      (file) => file instanceof File
    );

    if (files.length !== data.fieldArray.length) {
      return { error: ["Number of files does not match number of fields."] };
    }

    const arrayBuffers = await Promise.all(
      files.map((file) => file.arrayBuffer())
    );

    const origins = await Promise.all(
      arrayBuffers.map((arrayBuffer) =>
        sharp(Buffer.from(arrayBuffer))
          .webp({ quality: 100, effort: 6 })
          .toBuffer()
      )
    );

    const thumbnails = await Promise.all(
      arrayBuffers.map((arrayBuffer) =>
        sharp(Buffer.from(arrayBuffer))
          .resize(480, 270, { fit: "cover" })
          .webp({ quality: 50, effort: 6 })
          .toBuffer()
      )
    );

    const metadataList = data.fieldArray.map((metadata, i) => ({
      ...metadata,
      size: origins[i].byteLength + thumbnails[i].byteLength,
    }));

    console.log(metadataList, thumbnails, origins);

    // TODO: 這裡應該要將資料寫入資料庫
  } catch (error) {
    return { error: ["Something went wrong"] };
  }

  return;
}

/**
 * 更新圖片資料。
 * @returns 成功時回傳 undefined，失敗時回傳一個包含錯誤訊息的物件。
 */
export async function updateImages(
  data: z.infer<typeof MetadataSchema> & { fieldArray: { id: string }[] }
) {
  log("ACTION", "Updating images");

  try {
    const session = await auth();
    if (!session)
      return { error: ["Authentication required to modify files."] };
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
export async function deleteImages(data: string[]) {
  log("ACTION", "Deleting images");

  try {
    const session = await auth();
    if (!session)
      return { error: ["Authentication required to delete files."] };
    // TODO
  } catch (error) {
    return { error: ["Something went wrong"] };
  }

  return;
}
