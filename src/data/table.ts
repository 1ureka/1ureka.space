import "server-only";

import { auth } from "@/auth";
import { db } from "@/data/db";
import { log } from "@/utils/server-utils";
import type { ImageMetadataWithIndex, ImageMetadata } from "@/data/type";

async function dbAuth() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error(`Unauthorized access to database: User session not found`);
  }

  const id = JSON.stringify(session.user.id);

  if (id !== process.env.ALLOWED_USER) {
    throw new Error(`Unauthorized access to database: User not authorized`);
  }
}

export async function getSortedMetadata(
  category: string
): Promise<ImageMetadataWithIndex[]> {
  log("DATABASE", `get sorted metadata list category (${category})`);

  try {
    const metadataList = await db.imageMetadata.findMany({
      where: { category },
      include: { thumbnail: false, origin: false },
      orderBy: [{ group: "asc" }, { name: "asc" }],
    });

    return metadataList.map((data, index) => ({ index, ...data }));
  } catch (error) {
    throw new Error(`Failed to query image metadata`);
  }
}

export async function getAllMetadata() {
  log("DATABASE", `get all metadata list`);

  try {
    const metadataList = await db.imageMetadata.findMany({
      include: { thumbnail: false, origin: false },
    });

    return metadataList;
  } catch (error) {
    throw new Error(`Failed to query image metadata`);
  }
}

export async function getMetadataCount(category: string) {
  log("DATABASE", `get metadata count category (${category})`);

  try {
    const count = await db.imageMetadata.count({
      where: { category },
    });

    return count;
  } catch (error) {
    throw new Error(`Failed to query metadata count`);
  }
}

export async function getMetadataById(metadataId: string) {
  log("DATABASE", `get metadata by metadataId (${metadataId})`);

  try {
    const metadata = await db.imageMetadata.findUnique({
      where: { id: metadataId },
      include: { thumbnail: false, origin: false },
    });
    return metadata;
  } catch (error) {
    throw new Error(`Failed to query metadata`);
  }
}

export async function getMetadataNames() {
  log("DATABASE", `get all images names`);

  try {
    const metadataList = await db.imageMetadata.findMany({
      select: { name: true },
    });

    return metadataList.map(({ name }) => name);
  } catch (error) {
    throw new Error(`Failed to query image names`);
  }
}

export async function getMetadataIDs() {
  log("DATABASE", `get all images ids`);

  try {
    const metadataList = await db.imageMetadata.findMany({
      select: { id: true },
    });

    return metadataList.map(({ id }) => id);
  } catch (error) {
    throw new Error(`Failed to query image ids`);
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

export async function getOriginById(metadataId: string) {
  log("DATABASE", `get origin by metadataId (${metadataId})`);

  try {
    await dbAuth();

    const origin = await db.origin.findUnique({
      where: { metadataId },
      select: { bytes: true },
    });

    return origin;
  } catch (error) {
    throw new Error(`Failed to query origin`);
  }
}

export async function createMetadata(
  metadataList: Pick<ImageMetadata, "category" | "group" | "name" | "size">[]
) {
  log("DATABASE", `create metadata`);

  try {
    await dbAuth();

    const res = await db.imageMetadata.createManyAndReturn({
      data: metadataList.map((metadata) => metadata),
      select: { id: true },
    });

    return res.map(({ id }) => id);
  } catch (error) {
    throw new Error(`Failed to create ImageMetadata: ${error}`);
  }
}

export async function createThumbnails(
  thumbnailList: { metadataId: string; bytes: Buffer }[]
) {
  log("DATABASE", `create thumbnails`);

  try {
    await dbAuth();

    const res = await db.thumbnail.createMany({
      data: thumbnailList,
    });

    return res;
  } catch (error) {
    throw new Error(`Failed to create Thumbnails`);
  }
}

export async function createOrigins(
  originList: { metadataId: string; bytes: Buffer }[]
) {
  log("DATABASE", `create origins`);

  try {
    await dbAuth();

    const res = await db.origin.createMany({
      data: originList,
    });

    return res;
  } catch (error) {
    throw new Error(`Failed to create Origins`);
  }
}

export async function deleteMetadata(metadataIds: string[]) {
  log("DATABASE", `delete metadata`);

  try {
    await dbAuth();

    const res = await db.imageMetadata.deleteMany({
      where: { id: { in: metadataIds } },
    });

    return res.count;
  } catch (error) {
    throw new Error(`Failed to delete ImageMetadata`);
  }
}
