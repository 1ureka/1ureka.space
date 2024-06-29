"use client";

import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import type { AnimationDefinition } from "framer-motion";

import { useRecoilState } from "recoil";
import { BOOKS_CAROUSELS } from "@/context/store";
import type { Metadata } from "@/data/table";

import { useTheme } from "@mui/material";
import { carouselsVar } from "@/components/MotionProps";
import { Asides, Image, Slides } from "..";

export default function Carousels({
  metadataList,
}: {
  metadataList: Metadata[];
}) {
  const [index, setIndex] = useRecoilState(BOOKS_CAROUSELS);
  const listLength = metadataList.length;
  const open = index > 0 && index < listLength;
  const _index = open ? index : 1;

  const pointerEvents = useMotionValue("");

  const handleContextMenu: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setIndex(-1);
    pointerEvents.set("none");
  };

  const handleAnimateStart = (e: AnimationDefinition) => {
    if (e === "animate") pointerEvents.set(""); // 若未完全關閉又再次打開時
  };

  const handleWheel: React.WheelEventHandler = (e) => {
    const change = e.deltaY > 0 ? 1 : -1;
    setIndex((prev) => (prev + change + listLength) % listLength);
  };

  const theme = useTheme();
  const style = {
    zIndex: theme.zIndex.drawer - 1,
    background: theme.vars.palette.content.backdrop,
    position: "absolute",
    inset: 0,
    pointerEvents,
  } as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={carouselsVar}
          initial="initial"
          animate="animate"
          exit="exit"
          style={style}
          onContextMenu={handleContextMenu}
          onWheel={handleWheel}
          onAnimationStart={handleAnimateStart}
        >
          <Image
            width="75vw"
            height="77.5vh"
            metadataList={metadataList}
            index={_index}
          />
          <Slides
            width="12.5%"
            right="1%"
            metadataList={metadataList}
            index={_index}
          />
          <Asides
            inset="3% 10% 3% 2%"
            current={_index}
            total={metadataList.length}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
