import { BoxM } from "@/components/Motion";
import { carouselsSlidesVar } from "@/components/MotionProps";
import type { Metadata } from "@/data/table";

export default function Slides({
  width,
  right,
  metadataList,
  index,
}: {
  width: string;
  right: string;
  metadataList: Metadata[];
  index: number;
}) {
  return (
    <BoxM
      sx={{ position: "absolute", inset: `0 ${right} 0 auto`, width }}
      variants={carouselsSlidesVar}
    >
      {/* <ImageSlides rows={rows} selected={selected} /> */}
    </BoxM>
  );
}
