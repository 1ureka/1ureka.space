"use client";

import { useEffect, useState } from "react";
import { useSpring, useTransform } from "framer-motion";
import { Box, Skeleton, useTheme } from "@mui/material";
import type { BoxProps } from "@mui/material";

import { BoxM, StackM } from "@/components/Motion";
import { carouselsSlidesVar } from "@/components/MotionProps";

import Image from "next/image";
import { useCarouselIndex } from "@/hooks";
import type { ImageMetadataWithIndex } from "@/data/type";

export default function Slides({
  metadataList,
  sx,
}: {
  metadataList: ImageMetadataWithIndex[];
  sx?: BoxProps["sx"];
}) {
  const [loading, setLoading] = useState(true);
  const index = useCarouselIndex(metadataList);

  const {
    shape: { borderRadius },
  } = useTheme();

  const spring = useSpring(0, { stiffness: 110, damping: 22 });

  useEffect(() => {
    spring.set(index);
  }, [spring, index]);

  const y = useTransform(
    spring,
    (latest) => `calc(50vh + (-100% / ${metadataList.length}) * ${latest})`
  );

  return (
    <BoxM sx={sx} variants={carouselsSlidesVar}>
      <StackM style={{ y }}>
        {metadataList.map((metadata, i) => (
          <BoxM
            key={metadata.name}
            sx={{ translate: "0 -50%", transformOrigin: "right", py: 1 }}
            animate={
              i === index
                ? { opacity: 1, scale: 0.9 }
                : { opacity: 0.85, scale: 0.65 }
            }
          >
            <Box sx={{ position: "relative", width: 1, aspectRatio: "16/9" }}>
              <Image
                src={`/api/image/${metadata.id}/thumbnail`}
                alt={metadata.name}
                fill
                onLoad={() => setLoading(false)}
                unoptimized
                style={{ borderRadius, display: "block" }}
              />
              {loading && (
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{ width: 1, height: 1 }}
                />
              )}
            </Box>
          </BoxM>
        ))}
      </StackM>
    </BoxM>
  );
}
