import { BoxM, yVar } from "@/components/Motion";
import type { SxProps, Theme } from "@mui/material";

import flower from "@/images/flower.webp";
import Image from "next/image";

export default function FlowerImage({ sx }: { sx: SxProps<Theme> }) {
  return (
    <BoxM
      variants={yVar}
      sx={{ position: "absolute", pointerEvents: "none", ...sx }}
    >
      <Image
        src={flower}
        alt="Background flower decoration"
        width={150}
        height={150}
        style={{ scale: "-1 -1", opacity: 0.2 }}
        placeholder="blur"
        decoding="async"
      />
    </BoxM>
  );
}
