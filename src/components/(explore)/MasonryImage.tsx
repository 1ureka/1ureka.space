import { clamp } from "@/utils/utils";
import { Box } from "@mui/material";

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
    <Box
      sx={{
        gridRow: `span ${row}`,
        opacity: opacity,
        boxShadow: shadow,
        zIndex,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "426.667px 240px",
        backgroundPosition: `${clamp(x, 0, 100)}% ${clamp(y, 0, 100)}%`,
      }}
    />
  );
}
