"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";

import { Alert } from "..";
import type { ImageMetadataWithIndex } from "@/data/table";
import { delay } from "@/utils/client-utils";

import { BoxM } from "@/components/Motion";
import { carouselsImageVar } from "@/components/MotionProps";
import { carouselsOriginVar } from "@/components/MotionProps";

const containerSx = {
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
};

const createImageContainerSx = (width: string, height: string) => ({
  position: "relative",
  display: "grid",
  placeItems: "center",
  overflow: "clip",
  width,
  height,
  maxWidth: `calc(${height} * (16 / 9))`,
  maxHeight: `calc(${width} * (9 / 16))`,
});

export default function ImageAndName({
  width,
  height,
  metadataList,
  index,
}: {
  width: string;
  height: string;
  metadataList: ImageMetadataWithIndex[];
  index: number;
}) {
  const metadata = metadataList[index];
  const isAuth = false; // TODO: get real session (use a custom hook which includes check email)

  // TODO: move to hooks/books.ts: return src and state
  const [thumbnailSrc, setThumbnailSrc] = useState<string | undefined>();
  const [loadingT, setLoadingT] = useState(true);

  const [originSrc, setOriginSrc] = useState<string | undefined>();
  const [loadingO, setLoadingO] = useState(true);

  useEffect(() => {
    setLoadingT(true);
    setThumbnailSrc(`/api/image/${metadata.id}/thumbnail`);
    // thumbnail 不需要 throttle
  }, [metadata]);

  useEffect(() => {
    if (!isAuth) return;

    let isCurr = true;
    setLoadingO(true);

    (async () => {
      await delay(250);
      if (!isCurr) return;
      setOriginSrc(`/api/image/${metadata.id}/origin`);
    })();

    return () => {
      isCurr = false;
    };
  }, [metadata, isAuth]);

  return (
    <Box sx={containerSx}>
      <BoxM
        variants={carouselsImageVar}
        sx={createImageContainerSx(width, height)}
      >
        {loadingT && (
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ width: 1, height: 1 }}
          />
        )}
        {thumbnailSrc && (
          <Image
            unoptimized
            fill
            src={thumbnailSrc}
            alt={metadata.name}
            onLoad={() => setLoadingT(false)}
            style={{
              display: "block",
              scale: "1.1",
              filter: "blur(5px) brightness(0.8)",
            }}
          />
        )}
        {originSrc && (
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
        )}
        {/* 當loadingO=true時，代表1. 首次載入 2. 切換瞬間 */}
        {/* 因此呈現原圖的方式就是，當loadingO時，原圖容器保持initial，否則animate */}
        {/* 並且原圖容器再被 originSrc && 包住，確保首次載入不會有問題*/}

        {/* 測試 1. 快速切換是否有throttle */}
        {/* 注意全螢幕組件與loadingO的關係!! */}

        {!isAuth && <Alert />}
      </BoxM>

      <Typography variant="h6" sx={{ position: "absolute", bottom: "3%" }}>
        {metadata.name}
      </Typography>
    </Box>
  );
}
