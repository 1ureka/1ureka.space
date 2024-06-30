// import { db } from "./db";

import { ImageMetadata } from "@prisma/client";

export type ImageMetadataWithIndex = {
  index: number;
} & ImageMetadata;

// export async function getPosts() {
//   // ...
// }

// export async function createPost(title: string, content: string) {
//   // ...
// }

// export async function updatePost(id: number, title: string, content: string) {
//   // ...
// }

// export async function deletePost(id: number) {
//   // ...
// }
