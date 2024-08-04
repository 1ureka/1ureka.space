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

export async function getAllMetadata<
  T extends Partial<Record<keyof ImageMetadata, boolean>>
>(select: T) {
  log("DATABASE", `get all metadata`);

  try {
    await dbAuth();

    const metadataList = await db.imageMetadata.findMany({
      select,
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

export async function updateMetadata(
  metadataList: Omit<
    ImageMetadata,
    "createAt" | "updateAt" | "deletedAt" | "size"
  >[]
): Promise<void> {
  log("DATABASE", `update metadata`);

  try {
    await dbAuth();

    const updateOperations = metadataList.map((metadata) =>
      db.imageMetadata.update({
        where: { id: metadata.id },
        data: metadata,
      })
    );

    await Promise.all(updateOperations);
  } catch (error) {
    throw new Error(`Failed to update ImageMetadata`);
  }
}

export async function verifyAllCategory() {
  log("DATABASE", `verify metadata category`);

  try {
    await dbAuth();

    const count = await db.imageMetadata.count({
      where: { NOT: { category: { in: ["scene", "props"] } } },
    });

    return count;
  } catch (error) {
    throw new Error(`Failed to verify metadata category`);
  }
}

export async function verifyAllThumbnail() {
  log("DATABASE", `verify thumbnails`);

  try {
    await dbAuth();

    const count = await db.imageMetadata.count({
      where: { thumbnail: null },
    });

    return count;
  } catch (error) {
    throw new Error(`Failed to verify thumbnail`);
  }
}

export async function verifyAllOrigin() {
  log("DATABASE", `verify origins`);

  try {
    await dbAuth();

    const count = await db.imageMetadata.count({
      where: { origin: null },
    });

    return count;
  } catch (error) {
    throw new Error(`Failed to verify origin`);
  }
}

export async function summaryCategorySize() {
  log("DATABASE", `summary category size`);

  try {
    const groupBy = await db.imageMetadata.groupBy({
      by: ["category"],
      _sum: { size: true },
    });

    const summary = groupBy.reduce((acc, { category, _sum }) => {
      acc[category] = _sum.size ?? NaN;
      return acc;
    }, {} as Record<string, number>);

    return summary;
  } catch (error) {
    throw new Error(`Failed to summary category size`);
  }
}
