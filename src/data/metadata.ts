import "server-only";

import { validateUserSession } from "@/auth";
import { db } from "@/data/db";
import { log } from "@/utils/server-utils";
import type { ImageMetadataWithIndex, ImageMetadata } from "@/data/type";

type Select = Partial<Record<keyof ImageMetadata, boolean>>;
type RequiredField = "category" | "group" | "name";
type CreateList = Pick<ImageMetadata, RequiredField | "size">[];
type UpdateList = Pick<ImageMetadataWithIndex, RequiredField | "id">[];

async function auth() {
  const session = await validateUserSession({ isRedirect: false });

  if (!session) {
    throw new Error(`Unauthorized access to database: User session not found`);
  }
}

// 公開查詢
export async function getSortedMetadata(
  category: string
): Promise<ImageMetadataWithIndex[]> {
  log("DATABASE", `get sorted metadata list category (${category})`);

  try {
    const metadataList = await db.imageMetadata.findMany({
      where: { category },
      orderBy: [{ group: "asc" }, { name: "asc" }],
    });

    return metadataList.map((data, index) => ({ index, ...data }));
  } catch (error) {
    throw new Error(`Failed to query image metadata`);
  }
}

export async function getMetadataCount(category: string) {
  log("DATABASE", `get metadata count category (${category})`);

  try {
    return db.imageMetadata.count({
      where: { category },
    });
  } catch (error) {
    throw new Error(`Failed to query metadata count`);
  }
}

export async function getMetadataById(metadataId: string) {
  log("DATABASE", `get metadata by metadataId (${metadataId})`);

  try {
    return db.imageMetadata.findUnique({
      where: { id: metadataId },
    });
  } catch (error) {
    throw new Error(`Failed to query metadata`);
  }
}

// 管理員查詢
export async function getAllMetadata<T extends Select>(select: T) {
  log("DATABASE", `get all metadata`);

  try {
    await auth();
    return db.imageMetadata.findMany({ select });
  } catch (error) {
    throw new Error(`Failed to query image metadata`);
  }
}

export async function createMetadata(metadataList: CreateList) {
  log("DATABASE", `create metadata`);

  try {
    await auth();

    const res = await db.imageMetadata.createManyAndReturn({
      data: metadataList,
      select: { id: true },
    });

    return res.map(({ id }) => id);
  } catch (error) {
    throw new Error(`Failed to create ImageMetadata: ${error}`);
  }
}

export async function updateMetadata(metadataList: UpdateList): Promise<void> {
  log("DATABASE", `update metadata`);

  try {
    await auth();

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

export async function deleteMetadata(metadataIds: string[]) {
  log("DATABASE", `delete metadata`);

  try {
    await auth();

    const res = await db.imageMetadata.deleteMany({
      where: { id: { in: metadataIds } },
    });

    return res.count;
  } catch (error) {
    throw new Error(`Failed to delete ImageMetadata`);
  }
}
