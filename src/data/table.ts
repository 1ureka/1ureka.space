import { db } from "@/data/db";
import { log } from "@/utils/server-utils";
import type { ImageMetadataWithIndex, ImageMetadata } from "@/data/type";

// temp
import fs from "fs";
import sharp from "sharp";
import { shuffleArray } from "@/utils/utils";

const I = [
  { name: "image01", group: "primary.main" },
  { name: "image02", group: "secondary.main" },
  { name: "image03", group: "info.main" },
  { name: "image04", group: "primary.main" },
  { name: "image05", group: "warning.main" },
  { name: "image06", group: "secondary.main" },
  { name: "image07", group: "info.main" },
  { name: "image08", group: "primary.main" },
  { name: "image09", group: "warning.main" },
  { name: "image10", group: "secondary.main" },
  { name: "image11", group: "info.main" },
  { name: "image12", group: "primary.main" },
  { name: "image13", group: "warning.main" },
  { name: "image14", group: "secondary.main" },
  { name: "image15", group: "info.main" },
];

export const generateFakeData = async () => {
  const basepath = "C:\\Users\\Summe\\Downloads\\fakedata";
  const files = fs.readdirSync(basepath);

  const thumbnails = await Promise.all(
    files.map((file) =>
      sharp(`${basepath}\\${file}`).webp({ quality: 65, effort: 6 }).toBuffer()
    )
  );

  const origins = await Promise.all(
    files.map((file) =>
      sharp(`${basepath}\\${file}`).webp({ quality: 100, effort: 6 }).toBuffer()
    )
  );

  const imageData = shuffleArray(I).map(({ name, group }, i) => ({
    category: "props",
    group,
    name,
    thumbnail: { create: { bytes: thumbnails[i] } },
    origin: { create: { bytes: origins[i] } },
    size: origins[i].byteLength + thumbnails[i].byteLength,
  }));

  await db.imageMetadata.deleteMany({});

  const responce = await Promise.all(
    imageData.map((data) => db.imageMetadata.create({ data }))
  );

  console.log("GENERATE: " + responce.length + "  DATAS");
};

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
    const res = await db.imageMetadata.createManyAndReturn({
      data: metadataList.map((metadata) => metadata),
      select: { id: true },
    });

    return res.map(({ id }) => id);
  } catch (error) {
    throw new Error(`Failed to create ImageMetadata`);
  }
}

export async function createThumbnails(
  thumbnailList: { metadataId: string; bytes: Buffer }[]
) {
  log("DATABASE", `create thumbnails`);

  try {
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
    const res = await db.origin.createMany({
      data: originList,
    });

    return res;
  } catch (error) {
    throw new Error(`Failed to create Origins`);
  }
}
