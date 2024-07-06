"use client";

import { useEffect, useState } from "react";
import type { ImageMetadataWithIndex } from "@/data/type";
import { delay } from "@/utils/client-utils";
import { useCarouselIndex } from "@/hooks";

import Image from "next/image";
import { BoxM } from "@/components/Motion";
import { carouselsOriginVar } from "@/components/MotionProps";

export default function Origin({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  const index = useCarouselIndex(metadataList);
  const metadata = metadataList[index];

  const [originSrc, setOriginSrc] = useState<string | undefined>();
  const [loadingO, setLoadingO] = useState(true);

  useEffect(() => {
    let isCurr = true;
    setLoadingO(true);

    (async () => {
      await delay(250);
      if (!isCurr) return;
      console.log("fetch origin", metadata);
      setOriginSrc(`/api/image/${metadata.id}/origin`);
    })();

    return () => {
      isCurr = false;
    };
  }, [metadata]);

  return (
    originSrc && (
      <BoxM
        variants={carouselsOriginVar}
        animate={loadingO ? "hide" : "show"}
        sx={{ position: "absolute", width: 1, height: 1 }}
      >
        <Image
          unoptimized
          fill
          src={originSrc}
          alt={metadata.name}
          onLoad={() => setLoadingO(false)}
        />
      </BoxM>
    )
    // {/* 注意全螢幕組件與loadingO的關係!! */}
  );
}
