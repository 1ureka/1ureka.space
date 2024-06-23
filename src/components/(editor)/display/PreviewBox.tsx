"use client";
import { useRef } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useMotionTemplate, useMotionValue } from "framer-motion";
import { motion, type MotionValue } from "framer-motion";

import { BoxM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import { useDecode, useEditorPreview } from "@/utils/hooks";

export default function PreviewBox() {
  const constraintsRef = useRef(null);
  const cursor = useMotionValue("pointer") as unknown as "zoom-out" &
    MotionValue<string>;
  const x = useMotionValue(-3);
  const clipPathL = useMotionTemplate`inset(0 calc(50% - ${x}px - 3px) 0 0)`;
  const clipPathR = useMotionTemplate`inset(0 0 0 calc(50% + ${x}px + 3px))`;

  const { name, originUrl, previewUrl, filterString } = useEditorPreview();
  const [originSrc, originState] = useDecode(originUrl);
  const [resultSrc, resultState] = useDecode(previewUrl);

  return (
    <BoxM variants={yScaleVar} sx={{ height: 1 }}>
      <Box
        position="relative"
        ref={constraintsRef}
        sx={{
          height: 1,
          border: 2,
          borderColor: "divider",
          borderStyle: "dashed",
          borderRadius: 3,
          p: 4,
        }}
      >
        <Typography
          variant="caption"
          sx={{ position: "absolute", inset: "0 auto auto 0", p: 1, zIndex: 1 }}
        >
          {name}
        </Typography>

        <Box sx={{ position: "relative", width: 1, height: 1 }}>
          {originState && (
            <motion.img
              variants={yScaleVar}
              src={originSrc}
              alt={""}
              style={{
                width: 1,
                height: 1,
                objectFit: "contain",
                clipPath: clipPathL,
              }}
            />
          )}
          {resultState && (
            <motion.img
              variants={yScaleVar}
              src={resultSrc}
              alt={""}
              style={{
                position: "absolute",
                inset: 0,
                width: 1,
                height: 1,
                objectFit: "contain",
                clipPath: clipPathR,
                filter: filterString,
              }}
            />
          )}
        </Box>

        {name && (!originState || !resultState) && (
          <LinearProgress
            sx={{ position: "absolute", inset: "auto 0 0 0", width: "100%" }}
          />
        )}

        <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <BoxM
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => cursor.set("none")}
            onDragEnd={() => cursor.set("pointer")}
            style={{ x }}
            sx={{
              position: "relative",
              left: "50%",
              height: 1,
              width: "0px",
              borderWidth: "0px 2px 0px 2px",
              borderColor: "divider",
              borderStyle: "dashed",
            }}
          >
            <BoxM
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: 3,
                borderColor: "divider",
                borderStyle: "solid",
                bgcolor: "background.default",
              }}
              style={{ cursor }}
            />
          </BoxM>
        </Box>
      </Box>
    </BoxM>
  );
}
