import type { ImageMetadata } from "@prisma/client";

export type { ImageMetadata };

export type ImageMetadataWithIndex = {
  index: number;
} & ImageMetadata;
