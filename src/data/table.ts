import { db } from "@/data/db";
import { log } from "@/utils/server-utils";
import type { ImageMetadata } from "@prisma/client";

// temp
import fs from "fs";
import sharp from "sharp";
import { arraySum, shuffleArray } from "@/utils/utils";

export type ImageMetadataWithIndex = {
  index: number;
} & ImageMetadata;

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

  console.log(
    arraySum(origins.map((file) => file.byteLength / 1024)) +
      arraySum(thumbnails.map((file) => file.byteLength / 1024))
  );

  const imageData = shuffleArray(I).map(({ name, group }, i) => ({
    category: "props",
    group,
    name,
    thumbnail: { create: { bytes: thumbnails[i] } },
    origin: { create: { bytes: origins[i] } },
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
  log("DATABASE", `list category (${category})`);

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
