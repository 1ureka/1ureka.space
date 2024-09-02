import "server-only";

import { validateKey } from "@/auth";
import { db } from "@/data/db";
import { log } from "@/utils/server-utils";

function auth() {
  const key = validateKey({ redirect: false });

  if (!key) {
    throw new Error(`Unauthorized access to database: User session not found`);
  }
}

export async function getThumbnailById(metadataId: string) {
  log("DATABASE", `get thumbnail by metadataId (${metadataId})`);

  try {
    const thumbnail = await db.thumbnail.findUnique({
      where: { metadataId },
      select: { bytes: true },
    });

    return thumbnail;
  } catch (error) {
    throw new Error(`Failed to query thumbnail`);
  }
}

export async function createThumbnails(
  thumbnailList: { metadataId: string; bytes: Buffer }[]
) {
  log("DATABASE", `create thumbnails`);
  auth();

  try {
    const res = await db.thumbnail.createMany({
      data: thumbnailList,
    });

    return res;
  } catch (error) {
    throw new Error(`Failed to create Thumbnails`);
  }
}
