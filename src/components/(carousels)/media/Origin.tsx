"use client";

import type { ImageMetadataWithIndex } from "@/data/type";
import { useCarouselIndex, useDecode } from "@/hooks";

import { carouselsOriginVar } from "@/components/MotionProps";
import { motion } from "framer-motion";

export default function Origin({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  const index = useCarouselIndex(metadataList);
  const metadata = metadataList[index];
  const [src, state] = useDecode(`/api/image/${metadata.id}/origin`);

  return (
    <motion.img
      variants={carouselsOriginVar}
      animate={state ? "show" : "hide"}
      src={src}
      alt={metadata.name}
      style={{
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    />
    // {/* 注意全螢幕組件與loadingO的關係!! */}
  );
}
