import "server-only";

import { cache } from "react";
import { validateSession } from "@/auth";
import { db } from "@/data/db";
import type { ImageMetadataWithIndex } from "@/data/type";
import type { ImageMetadata, ExploreMetadata } from "@/data/type";

type Select = Partial<Record<keyof ImageMetadata, boolean>>;
type RequiredField = "category" | "group" | "name";
type CreateList = Pick<ImageMetadata, RequiredField | "size">[];
type UpdateList = Pick<ImageMetadataWithIndex, RequiredField | "id">[];
type CreateExploreList = Omit<ExploreMetadata, "id">[];

async function auth() {
  const session = await validateSession({ redirect: false });

  if (!session) {
    throw new Error(`Unauthorized access to database: User session not found`);
  }
}

// 公開查詢
export const getSortedMetadata = cache(async function (
  category: "scene" | "props"
) {
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
});

export const getMetadataCount = cache(async function (
  category: "scene" | "props"
) {
  try {
    return db.imageMetadata.count({
      where: { category },
    });
  } catch (error) {
    throw new Error(`Failed to query metadata count`);
  }
});

export const getMetadataById = cache(async function (metadataId: string) {
  try {
    return db.imageMetadata.findUnique({
      where: { id: metadataId },
    });
  } catch (error) {
    throw new Error(`Failed to query metadata`);
  }
});

export const getMetadataByGroup = cache(async function (group: string) {
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
});

// 管理員查詢
export const getAllMetadata = cache(async function <T extends Select>(
  select: T
) {
  try {
    await auth();

    return db.imageMetadata.findMany({ select });
  } catch (error) {
    throw new Error(`Failed to query image metadata`);
  }
});

export const getAllGroups = cache(async function () {
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
});

export const getAllExploreMetadata = cache(async function () {
  try {
    await auth();

    return db.exploreMetadata.findMany({
      include: { metadata: true },
    });
  } catch (error) {
    throw new Error(`Failed to query explore metadata`);
  }
});

export const createMetadata = async function (metadataList: CreateList) {
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
};

export const updateMetadata = async function (
  metadataList: UpdateList
): Promise<void> {
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
};

export const deleteMetadata = async function (metadataIds: string[]) {
  try {
    await auth();

    const res = await db.imageMetadata.deleteMany({
      where: { id: { in: metadataIds } },
    });

    return res.count;
  } catch (error) {
    throw new Error(`Failed to delete ImageMetadata`);
  }
};

export const createExploreMetadata = async function (
  metadataList: CreateExploreList
) {
  try {
    await auth();

    return db.exploreMetadata.createMany({ data: metadataList });
  } catch (error) {
    throw new Error(`Failed to create ExploreMetadata`);
  }
};

export const updateExploreMetadata = async function (
  metadataList: ExploreMetadata[]
) {
  await auth();

  const data = metadataList.map(({ metadataId: _, ...fields }) => fields);
  const updateOperations = data.map((fields) =>
    db.exploreMetadata.update({
      where: { id: fields.id },
      data: fields,
    })
  );

  await Promise.all(updateOperations);
};

export const deleteExploreMetadata = async function (exploreIds: string[]) {
  try {
    await auth();

    const res = await db.exploreMetadata.deleteMany({
      where: { id: { in: exploreIds } },
    });

    return res.count;
  } catch (error) {
    throw new Error(`Failed to delete ExploreMetadata`);
  }
};
