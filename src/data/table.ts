import { db } from "@/data/db";
import type { ImageMetadata } from "@prisma/client";

// temp
import fs from "fs";
import { shuffleArray } from "@/utils/utils";
import { log } from "@/utils/server-utils";

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
  { name: "image16", group: "primary.main" },
  { name: "image17", group: "warning.main" },
  { name: "image18", group: "secondary.main" },
  { name: "image19", group: "info.main" },
  { name: "image20", group: "primary.main" },
  { name: "image21", group: "warning.main" },
  { name: "image22", group: "secondary.main" },
  { name: "image23", group: "info.main" },
  { name: "image24", group: "primary.main" },
  { name: "image25", group: "warning.main" },
];

export const generateFakeData = async () => {
  const buffer = fs.readFileSync(`./src/images/fakeData.webp`);

  await db.imageMetadata.deleteMany({});

  const imageData = shuffleArray(I).map(({ name, group }) => ({
    category: "props",
    group,
    name,
    thumbnail: { create: { bytes: buffer } },
  }));

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
