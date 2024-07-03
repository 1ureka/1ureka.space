import type { ImageMetadata } from "@prisma/client";

export type ImageMetadataWithIndex = {
  index: number;
} & ImageMetadata;
