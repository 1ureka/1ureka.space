import type { ImageMetadata, ExploreMetadata } from "@prisma/client";

export type { ImageMetadata, ExploreMetadata };

export type ImageMetadataWithIndex = {
  index: number;
} & ImageMetadata;
