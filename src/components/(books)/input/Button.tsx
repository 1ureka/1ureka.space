"use client";

import { Box, type ButtonBaseProps } from "@mui/material";
import { motion, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

import { ButtonBaseM } from "@/components/Motion";
import { useBooksButtonHandler } from "@/hooks";
import type { ImageMetadataWithIndex } from "@/data/type";

const coverSx = {
  zIndex: 1,
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
} as const;

const reflectSx = (clipPath: string, x: number): ButtonBaseProps["sx"] => ({
  translate: `${x}px 0px`,
  clipPath,
  filter: "blur(35px)",
  background: (theme) =>
    `linear-gradient(150deg, ${theme.palette.divider}, transparent)`,
  ...coverSx,
});

type ButtonProps = {
  metadata: ImageMetadataWithIndex;
  children: React.ReactNode;
};

export default function Button({ metadata, children }: ButtonProps) {
  const reflect = useSpring(0) as MotionValue<number>;
  const opacity = useTransform(reflect, (val) => val);
  const x = useTransform(reflect, (val) => -60 * val);

  const handleClick = useBooksButtonHandler(metadata);

  return (
    <ButtonBaseM
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02, filter: "brightness(1.05)", rotate: 2 }}
      onMouseEnter={() => reflect.set(1)}
      onMouseLeave={() => reflect.set(0)}
      sx={{
        borderRadius: 1,
        "&:hover": { zIndex: 1 },
        width: 1,
        height: 1,
      }}
      onClick={handleClick}
    >
      {children}
      <Box sx={{ overflow: "hidden", ...coverSx }}>
        <motion.div style={{ opacity, x, ...coverSx }}>
          <Box
            sx={reflectSx("polygon(35% 0, 50% 0, 25% 100%, 10% 100%)", -10)}
          />
          <Box
            sx={reflectSx("polygon(40% 0, 50% 0, 25% 100%, 15% 100%)", 25)}
          />
        </motion.div>
      </Box>
    </ButtonBaseM>
  );
}
