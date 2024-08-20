"use client";

import { Portal, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import type { ImageMetadataWithIndex } from "@/data/type";
import { useCarousels } from "@/hooks";
import { carouselsVar } from "@/components/MotionProps";

export default function Container({
  metadataList,
  children,
}: {
  metadataList: ImageMetadataWithIndex[];
  children: React.ReactNode;
}) {
  const { CarouselsProps, open, pointerEvents } = useCarousels(metadataList);

  const theme = useTheme();
  const style = {
    zIndex: theme.zIndex.modal,
    background: theme.vars.palette.content.backdrop,
    position: "absolute",
    inset: 0,
    pointerEvents,
  } as const;

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            id="Carousels"
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
