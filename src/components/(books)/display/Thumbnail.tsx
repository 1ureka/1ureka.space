"use client";

import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import type { ImageMetadataWithIndex } from "@/data/type";
import { delay } from "@/utils/client-utils";

export default function Thumbnail({
  metadata,
}: {
  metadata: ImageMetadataWithIndex;
}) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>();
  const shouldShowLoadingUI = useRef(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCurrentImage = true;
    shouldShowLoadingUI.current = true;

    (async () => {
      await delay(100);
      if (!isCurrentImage || !shouldShowLoadingUI.current) return;
      setLoading(true);
    })();

    setThumbnailUrl(`/api/image/${metadata.id}/thumbnail`);

    return () => {
      isCurrentImage = false;
    };
  }, [metadata]);

  return (
    <>
      {thumbnailUrl && (
        <Image
          unoptimized
          fill
          src={thumbnailUrl}
          alt={metadata.name}
          onLoad={() => {
            shouldShowLoadingUI.current = false;
            setLoading(false);
          }}
          style={{
            display: "block",
            scale: "1.1",
            filter: "blur(5px) brightness(0.8)",
            opacity: loading ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
      {loading && (
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{ width: 1, height: 1 }}
        />
      )}
    </>
  );
}
