"use client";

import { Portal, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import type { Metadata } from "@/data/table";
import { useCarousels } from "@/hooks";

import { carouselsVar } from "@/components/MotionProps";
import { Asides, ImageAndName, Slides } from "..";

export default function Carousels({
  metadataList,
}: {
  metadataList: Metadata[];
}) {
  const { CarouselsProps, index, open, pointerEvents } =
    useCarousels(metadataList);

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
            <ImageAndName
              width="75vw"
              height="77.5vh"
              metadataList={metadataList}
              index={index}
            />
            <Slides
              width="12.5%"
              right="1%"
              metadataList={metadataList}
              index={index}
            />
            <Asides
              inset="3% 10% 3% 2%"
              total={metadataList.length}
              current={index}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
