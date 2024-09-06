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
export async function getSortedMetadata(category: "scene" | "props") {
  try {
    const metadataList = await db.imageMetadata.findMany({
      where: { category },
      orderBy: [{ group: "asc" }, { name: "asc" }],
    });

    return metadataList.map((data, index) => ({
      index,
      ...data,
    })) as ImageMetadataWithIndex[];
  } catch (error) {
    throw new Error(`Failed to query image metadata`);
  }
}

export async function getMetadataCount(category: "scene" | "props") {
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

export async function getMetadataByGroup(group: string) {
  try {
    if (!group) return [];

    return db.imageMetadata.findMany({
      where: { group },
      select: { id: true, name: true, explore: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    throw new Error(`Failed to query metadata by group`);
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

export async function getAllGroups() {
  try {
    await auth();

    const result = await db.imageMetadata.findMany({
      where: { category: "scene" },
      select: { group: true, explore: { select: { id: true } } },
      distinct: ["group"],
      orderBy: { group: "asc" },
    });

    const allGroups = result.map(({ group }) => group);
    const avalibleGroups = result
      .filter(({ explore }) => !explore)
      .map(({ group }) => group);

    return { allGroups, avalibleGroups };
  } catch (error) {
    throw new Error(`Failed to query group metadata`);
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
