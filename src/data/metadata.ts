import "server-only";

import { validateSession } from "@/auth";
import { db } from "@/data/db";
import type { ImageMetadataWithIndex, ImageMetadata } from "@/data/type";

type Select = Partial<Record<keyof ImageMetadata, boolean>>;
type RequiredField = "category" | "group" | "name";
type CreateList = Pick<ImageMetadata, RequiredField | "size">[];
type UpdateList = Pick<ImageMetadataWithIndex, RequiredField | "id">[];

async function auth() {
  const session = await validateSession({ redirect: false });

  if (!session) {
    throw new Error(`Unauthorized access to database: User session not found`);
  }
}

// 公開查詢
export async function getSortedMetadata(
  category: string
): Promise<ImageMetadataWithIndex[]> {
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
  try {
    return db.imageMetadata.count({
      where: { category },
    });
  } catch (error) {
    throw new Error(`Failed to query metadata count`);
  }
}

export async function getMetadataById(metadataId: string) {
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
  try {
    await auth();

    return db.imageMetadata.findMany({ select });
  } catch (error) {
    throw new Error(`Failed to query image metadata`);
  }
}

export async function createMetadata(metadataList: CreateList) {
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
