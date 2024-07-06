"use client";

import { Portal, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import type { ImageMetadataWithIndex } from "@/data/type";
import { useCarousels } from "@/hooks";

import { carouselsVar } from "@/components/MotionProps";

export default function Carousels({
  metadataList,
  children,
}: {
  metadataList: ImageMetadataWithIndex[];
  children: React.ReactNode;
}) {
  const { CarouselsProps, open, pointerEvents } = useCarousels(metadataList);

  const theme = useTheme();
  const style = {
    zIndex: theme.zIndex.drawer - 1,
    background: theme.vars.palette.content.backdrop,
    position: "absolute",
    inset: 0,
    pointerEvents,
  } as const;

  return (
    <Portal container={() => document.getElementById("portal-root")}>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={carouselsVar}
            initial="initial"
            animate="animate"
            exit="exit"
            style={style}
            {...CarouselsProps}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
