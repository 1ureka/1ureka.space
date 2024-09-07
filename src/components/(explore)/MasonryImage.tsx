import Image from "next/image";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

type MasonryImageProps = {
  src: string;
  row: number;
  opacity: number;
  shadow: number;
  zIndex: number;
  x: number;
  y: number;
};

export default function MasonryImage({
  src,
  row,
  opacity,
  shadow,
  zIndex,
  x,
  y,
}: MasonryImageProps) {
  return (
    <BoxM
      variants={createMotionVar({ from: { y: 0 } })}
      sx={{
        position: "relative",
        display: "grid",
        placeItems: "center",
        gridRow: `span ${row}`,
        boxShadow: shadow,
        zIndex,
        opacity,
        overflow: "hidden",
      }}
    >
      <Image
        unoptimized
        src={src}
        alt="image"
        width={426.667}
        height={240}
        style={{
          position: "absolute",
          top: x < 2 ? 0 : "auto",
          bottom: x > 2 ? 0 : "auto",
          left: y < 2 ? 0 : "auto",
          right: y > 2 ? 0 : "auto",
        }}
      />
    </BoxM>
  );
}
