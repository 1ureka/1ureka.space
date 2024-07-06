"use server";

import { z } from "zod";
import { createMetadataSchema, MetadataSchema } from "@/schema/schema";

import { log } from "@/utils/server-utils";
import { getMetadataNames } from "@/data/table";
import { auth } from "@/auth";

export async function uploadImages(
  data: z.infer<typeof MetadataSchema>,
  files: FormData
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
        const { path, message } = issue; // path example: ["fieldArray", 1, "name"]
        const index = path[1] as number;
        const field = path[2] as string;
        return `"${message}" in image ${index + 1} at field "${field}"`;
      });

      return { error: errorMessages };
    }

    // const { upload } = result.data;

    // TODO: upload data
  } catch (error) {
    return { error: ["Something went wrong"] };
  }

  return;
}

export async function updateImages(data: z.infer<typeof MetadataSchema>) {
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
