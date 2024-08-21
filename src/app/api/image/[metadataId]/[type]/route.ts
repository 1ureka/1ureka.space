import { NextResponse } from "next/server";
import { getMetadataById, getOriginById, getThumbnailById } from "@/data/table";
import { auth } from "@/auth";

import { decryptAesGcm } from "@/utils/crypto";
import { log } from "@/utils/server-utils";

const getDevelopmentImage = async () => {
  const image = await getThumbnailById("clyuz9fkd0000s8hg5rdwevy0");

  if (!image) throw new Error("Failed to get development placeholder image");

  return image.bytes;
};

const getImage = async (metadataId: string, createAt: Date, type: string) => {
  let image: { bytes: Buffer } | null = null;

  if (type === "origin") {
    image = await getOriginById(metadataId);
  } else {
    image = await getThumbnailById(metadataId);
  }

  if (!image) return null;

  const encryptionStartDate = new Date(2024, 7, 21);
  if (createAt < encryptionStartDate) {
    return image.bytes;
  }

  if (!process.env.ENCRYPTION_KEY) {
    return getDevelopmentImage();
  }

  const bytes = decryptAesGcm(image.bytes, process.env.ENCRYPTION_KEY);

  if (!bytes) {
    throw new Error("Failed to decrypt image");
  }

  return bytes;
};

export const GET = auth(async function GET(request, segments) {
  const { params } = segments as {
    params: { metadataId: string; type: string };
  };

  const { metadataId, type } = params;
  log("API", `/image/${type}/${metadataId} GET`);

  try {
    if (type !== "origin" && type !== "thumbnail") {
      return NextResponse.json(
        { error: "Invalid image type. Please use 'origin' or 'thumbnail'." },
        { status: 400 }
      );
    }

    const adminId = process.env.ALLOWED_USER ?? false;
    const userId = JSON.stringify(request.auth?.user.id) ?? "none";
    if (type === "origin" && (!adminId || userId !== adminId)) {
      return NextResponse.json(
        { error: `Authentication required to access origin image.` },
        { status: 401 }
      );
    }

    const metadata = await getMetadataById(metadataId);
    if (!metadata || !metadata.updateAt || !metadata.createAt) {
      return NextResponse.json(
        { error: `Image metadata is missing or invalid` },
        { status: 500 }
      );
    }

    const ETag = metadata.updateAt.toISOString();
    if (request.headers.get("if-none-match") === ETag) {
      return new NextResponse(null, { status: 304 });
    }

    const imageBuffer = await getImage(metadata.id, metadata.createAt, type);
    if (!imageBuffer) {
      return NextResponse.json({ error: `image not found` }, { status: 404 });
    }

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "max-age=360, must-revalidate",
        ETag,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: `Internal server error` },
      { status: 500 }
    );
  }
});
