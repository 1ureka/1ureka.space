"use client";

import { useRecoilState } from "recoil";
import { EDITOR_VALS } from "@/context/store";

import { Box, Stack, Typography } from "@mui/material";
import { StackM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";
import { Number, Select, Slider } from "..";

type EditOptionType =
  | "saturate"
  | "contrast"
  | "exposure"
  | "maxSize"
  | "scale"
  | "type";

export type EditOptionValues = {
  saturate: number;
  contrast: number;
  exposure: number;
  maxSize: number;
  scale: number;
  type: "jpeg" | "png" | "webp";
};

const typeList = ["jpeg", "png", "webp"];

export default function EditOptions() {
  const [{ saturate, contrast, exposure, maxSize, scale, type }, setValues] =
    useRecoilState(EDITOR_VALS);

  const createSliderHandler =
    (type: EditOptionType) => (_: Event, val: number) =>
      setValues((prev) => ({ ...prev, [type]: val }));

  const createNumberHandler =
    (type: EditOptionType) => (val: number | string) =>
      setValues((prev) => ({ ...prev, [type]: val }));

  return (
    <StackM variants={createMotionVar({ staggerChildren: 0.07 })} spacing={6}>
      <Stack spacing={1}>
        <StackM variants={createMotionVar()}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            FILTER:
          </Typography>
        </StackM>

        <StackM variants={createMotionVar()}>
          <Typography>saturation</Typography>
          <Slider value={saturate} onChange={createSliderHandler("saturate")} />
        </StackM>

        <StackM variants={createMotionVar()}>
          <Typography>contrast</Typography>
          <Slider value={contrast} onChange={createSliderHandler("contrast")} />
        </StackM>

        <StackM variants={createMotionVar()}>
          <Typography>exposure</Typography>
          <Slider value={exposure} onChange={createSliderHandler("exposure")} />
        </StackM>
      </Stack>

      <Stack spacing={1}>
        <StackM variants={createMotionVar()}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            OUTPUT:
          </Typography>
        </StackM>

        <Box
          display="grid"
          sx={{ gridTemplateColumns: "0.6fr 1.2fr", alignItems: "center" }}
          gap={1.5}
        >
          <StackM variants={createMotionVar()}>
            <Typography>max size</Typography>
          </StackM>
          <StackM variants={createMotionVar()}>
            <Number
              min={1}
              max={999}
              step={1}
              value={maxSize}
              endText={"MB"}
              onChange={createNumberHandler("maxSize")}
            />
          </StackM>

          <StackM variants={createMotionVar()}>
            <Typography>scale</Typography>
          </StackM>
          <StackM variants={createMotionVar()}>
            <Number
              min={0.1}
              max={1.5}
              step={0.1}
              value={scale}
              endText={"x"}
              onChange={createNumberHandler("scale")}
            />
          </StackM>

          <StackM variants={createMotionVar()}>
            <Typography>file type</Typography>
          </StackM>
          <StackM variants={createMotionVar()}>
            <Select
              options={typeList}
              value={type}
              onChange={createNumberHandler("type")}
            />
          </StackM>
        </Box>
      </Stack>
    </StackM>
  );
}
