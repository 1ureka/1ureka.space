"use client";

import { useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { Portal } from "@mui/material";

import type { ImageMetadataWithIndex } from "@/data/type";
import { useCarouselIndex, useDecode } from "@/hooks";
import { carouselsOriginVar } from "@/components/MotionProps";

function calcScale(originW: number, originH: number) {
  const containerRatio = window.innerWidth / window.innerHeight;
  const imageRatio = originW / originH;

  let initScale, w, h;
  if (containerRatio > imageRatio) {
    w = window.innerWidth;
    h = w / imageRatio;
    initScale = originW / w;
  } else {
    h = window.innerHeight;
    w = h * imageRatio;
    initScale = originH / h;
  }

  return { initScale, w, h };
}

export default function Origin({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  const index = useCarouselIndex(metadataList);
  const metadata = metadataList[index];
  const [src, state] = useDecode(`/api/image/${metadata.id}/origin`);

  const [cursor, setCursor] = useState("grab");
  const pointerEvents = useMotionValue("");

  const ref = useRef<HTMLImageElement>(null);
  const [Props, setProps] = useState({
    src: "",
    open: false,
    initScale: 1,
    w: 1,
    h: 1,
  });

  const handleEnterFull = () => {
    if (!ref.current) return;

    const src = ref.current.src;
    const rect = ref.current.getBoundingClientRect();

    const originW = rect.width;
    const originH = rect.height;

    const { initScale, w, h } = calcScale(originW, originH);

    setProps({ src, open: true, initScale, w, h });
  };

  const handleExitFull: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setProps((prev) => ({ ...prev, open: false }));
  };

  const handleAnimationStart = (def: unknown) => {
    if (typeof def !== "object" || def === null) return;

    if ("opacity" in def && def.opacity === 0) {
      pointerEvents.set("none");
    } else {
      pointerEvents.set("");
    }
  };

  return (
    <>
      <motion.img
        ref={ref}
        variants={carouselsOriginVar}
        animate={state ? "show" : "hide"}
        src={src}
        alt={metadata.name}
        onClick={state ? handleEnterFull : undefined}
        style={{
          display: "block",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />

      <Portal>
        <AnimatePresence>
          {Props.open && (
            <motion.div
              id="CarouselsFullScreen"
              onContextMenu={handleExitFull}
              style={{
                pointerEvents,
                position: "fixed",
                inset: 0,
                display: "grid",
                placeItems: "center",
                zIndex: 9999,
              }}
            >
              <TransformWrapper
                centerOnInit
                onPanningStart={() => setCursor("grabbing")}
                onPanningStop={() => setCursor("grab")}
              >
                <TransformComponent
                  wrapperStyle={{ width: "100vw", height: "100vh" }}
                  contentStyle={{ cursor }}
                >
                  <motion.img
                    style={{ width: Props.w, height: Props.h }}
                    initial={{ scale: Props.initScale }}
                    animate={{ scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0 }}
                    src={Props.src}
                    alt=""
                    onAnimationStart={handleAnimationStart}
                  />
                </TransformComponent>
              </TransformWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
