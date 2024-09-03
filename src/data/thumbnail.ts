import "server-only";

import { validateSession } from "@/auth";
import { db } from "@/data/db";

async function auth() {
  const session = await validateSession({ redirect: false });

  if (!session) {
    throw new Error(`Unauthorized access to database: User session not found`);
  }
}

export async function getThumbnailById(metadataId: string) {
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
  try {
    await auth();

    const res = await db.thumbnail.createMany({
      data: thumbnailList,
    });

    return res;
  } catch (error) {
    throw new Error(`Failed to create Thumbnails`);
  }
}
