import { NextRequest, NextResponse } from "next/server";
import { getThumbnailById } from "@/data/table";
import { log } from "@/utils/server-utils";

export async function GET(
  _: NextRequest,
  { params }: { params: { metadataId: string; type: string } }
) {
  const { metadataId, type } = params;
  log("API", `/image/${type}/${metadataId} GET`);

  if (type === "origin") {
    // TODO: get real session and decide whether to query origin
    const session = false;
    if (!session) {
      return NextResponse.json(
        { error: `Authentication required to access origin image.` },
        { status: 401 }
      );
    }

    // TODO: query and get origin
  } else if (type === "thumbnail") {
    try {
      const thumbnail = await getThumbnailById(metadataId);

      if (!thumbnail) {
        return NextResponse.json(
          { error: `thumbnail not found` },
          { status: 404 }
        );
      }

      const buffer: Buffer = thumbnail.bytes;

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "image/webp",
          "Cache-Control": "public, max-age=31536000, immutable", // 快取一年
        },
      });
    } catch (error) {
      return NextResponse.json(
        { error: `Failed to fetch thumbnail` },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Invalid image type. Please use 'origin' or 'thumbnail'." },
      { status: 400 }
    );
  }
}
