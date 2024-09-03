import { NextResponse } from "next/server";
import { getMetadataById } from "@/data/metadata";
import { getThumbnailById } from "@/data/thumbnail";
import { getOriginById } from "@/data/origin";

import { decryptImage, validateSession } from "@/auth";
import { log } from "@/utils/server-utils";

const GET = async (
  request: Request,
  { params }: { params: { metadataId: string; type: string } }
) => {
  const { metadataId, type } = params;
  log("API", `/image/${type}/${metadataId} GET`);

  try {
    //
    // 驗證要求
    if (type !== "origin" && type !== "thumbnail") {
      return NextResponse.json(
        { error: "Invalid image type. Please use 'origin' or 'thumbnail'." },
        { status: 400 }
      );
    }

    const session = await validateSession({ redirect: false });
    if (type === "origin" && !session) {
      return NextResponse.json(
        { error: `Authentication required to access origin image.` },
        { status: 401 }
      );
    }

    //
    // 元資料與快取
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

    //
    // 取得圖片
    let imageBuffer: Buffer | null = null;

    // 原始圖片
    if (type === "origin") {
      const image = await getOriginById(metadataId);
      switch (true) {
        case !image:
          imageBuffer = null;
          break;

        case metadata.createAt < new Date(2024, 7, 21):
          imageBuffer = image.bytes;
          break;

        default:
          const result = await decryptImage(image.bytes);
          if ("error" in result) {
            return NextResponse.json({ error: result.error }, { status: 401 });
          }
          imageBuffer = result;
          break;
      }
    }

    // 縮圖
    if (type === "thumbnail") {
      imageBuffer = (await getThumbnailById(metadataId))?.bytes ?? null;
    }

    //
    // 回應 (無圖片)
    if (!imageBuffer) {
      return NextResponse.json({ error: `image not found` }, { status: 404 });
    }

    //
    // 回應 (有圖片)
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
};

export { GET };
