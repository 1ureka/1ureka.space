import { createMetadata, createThumbnails, createOrigins } from "@/data/table";
import type { ImageMetadata } from "@/data/type";
import { NextResponse } from "next/server";
import sharp from "sharp";

export const GET = async () => {
  const thumbnailBytes = await sharp({
    create: {
      width: 480,
      height: 270,
      channels: 3,
      background: { r: 255, g: 0, b: 0 },
    },
  })
    .webp()
    .toBuffer();

  const orginBytes = await sharp({
    create: {
      width: 1920,
      height: 1080,
      channels: 3,
      background: { r: 0, g: 255, b: 0 },
    },
  })
    .webp()
    .toBuffer();

  const fakeMetadata: Pick<
    ImageMetadata,
    "category" | "group" | "name" | "size"
  >[] = [
    {
      category: "cat",
      group: "cute",
      name: "kitty",
      size: thumbnailBytes.byteLength + orginBytes.byteLength,
    },
  ];

  const ids = await createMetadata(fakeMetadata);

  console.log(ids);

  const fakeThumbnail = ids.map((id) => ({
    metadataId: id,
    bytes: thumbnailBytes,
  }));

  const fakeOrigin = ids.map((id) => ({
    metadataId: id,
    bytes: orginBytes,
  }));

  const res1 = await createThumbnails(fakeThumbnail);
  const res2 = await createOrigins(fakeOrigin);

  console.log(res1, res2);

  return NextResponse.json(null, { status: 200 });
};
