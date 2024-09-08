"use client";

import Image from "next/image";
import { BoxM } from "@/components/Motion";
import { useDecode } from "@/hooks";

type CoverImageProps = { src: string; name: string };

export default function CoverImage({ src, name }: CoverImageProps) {
  const [_src, state] = useDecode(src);

  if (!state) return null;

  const variants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0, duration: 1 },
    },
  };

  return (
    <BoxM variants={variants} sx={{ position: "absolute", inset: 0 }}>
      <Image
        unoptimized
        src={src}
        alt={name}
        fill
        style={{ objectFit: "cover", filter: "brightness(1.3)" }}
      />
    </BoxM>
  );
}
