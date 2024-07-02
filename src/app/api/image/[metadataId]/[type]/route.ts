import { NextRequest, NextResponse } from "next/server";
import { getMetadataById, getOriginById, getThumbnailById } from "@/data/table";
import { log } from "@/utils/server-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { metadataId: string; type: string } }
) {
  const { metadataId, type } = params;
  log("API", `/image/${type}/${metadataId} GET`);

  try {
    if (type !== "origin" && type !== "thumbnail") {
      return NextResponse.json(
        { error: "Invalid image type. Please use 'origin' or 'thumbnail'." },
        { status: 400 }
      );
    }

    const session = false; // TODO: get real session
    if (type === "origin" && !session) {
      return NextResponse.json(
        { error: `Authentication required to access origin image.` },
        { status: 401 }
      );
    }

    const metadata = await getMetadataById(metadataId);
    if (!metadata || !metadata.updateAt) {
      return NextResponse.json(
        { error: `Image metadata is missing or invalid` },
        { status: 500 }
      );
    }

    const ETag = metadata.updateAt.toISOString();
    if (request.headers.get("if-none-match") === ETag) {
      return new NextResponse(null, { status: 304 });
    }

    let image: { bytes: Buffer } | null = null;
    if (type === "origin") {
      image = await getOriginById(metadataId);
    } else {
      image = await getThumbnailById(metadataId);
    }

    if (!image) {
      return NextResponse.json({ error: `image not found` }, { status: 404 });
    }

    const buffer: Buffer = image.bytes;
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "max-age=120, must-revalidate",
        ETag,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error` },
      { status: 500 }
    );
  }
}
