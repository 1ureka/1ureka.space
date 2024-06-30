"use client";

import { useEffect } from "react";
import { useSpring, useTransform } from "framer-motion";
import { Skeleton } from "@mui/material";

import { BoxM, StackM } from "@/components/Motion";
import { carouselsSlidesVar } from "@/components/MotionProps";
import type { ImageMetadataWithIndex } from "@/data/table";

const imageSx = {
  display: "block",
  width: "100%",
  height: "auto",
  aspectRatio: "16/9",
  objectFit: "cover",
} as const;

export default function Slides({
  width,
  right,
  metadataList,
  index,
}: {
  width: string;
  right: string;
  metadataList: ImageMetadataWithIndex[];
  index: number;
}) {
  const spring = useSpring(0, { stiffness: 110, damping: 22 });

  useEffect(() => {
    spring.set(index);
  }, [spring, index]);

  const y = useTransform(
    spring,
    (latest) => `calc(50vh + (-100% / ${metadataList.length}) * ${latest})`
  );

  return (
    <BoxM
      sx={{ position: "absolute", inset: `0 ${right} 0 auto`, width }}
      variants={carouselsSlidesVar}
    >
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
            <Skeleton animation="wave" variant="rounded" sx={imageSx} />
          </BoxM>
        ))}
      </StackM>
    </BoxM>
  );
}
