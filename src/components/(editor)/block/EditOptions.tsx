"use client";
import { Box, Stack, Typography } from "@mui/material";

import { useRecoilState } from "recoil";
import { EDITOR_VALS } from "@/context/store";

import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
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
  type: 0 | 1 | 2;
};

const typeList = ["jpeg", "png", "webp"];

export default function EditOptions() {
  const [{ saturate, contrast, exposure, maxSize, scale, type }, setValues] =
    useRecoilState(EDITOR_VALS);

  const createSliderHandler =
    (type: EditOptionType) => (_: Event, val: number) =>
      setValues((prev) => ({ ...prev, [type]: val }));

  const createNumberHandler = (type: EditOptionType) => (val: number) =>
    setValues((prev) => ({ ...prev, [type]: val }));

  return (
    <Stack spacing={6} sx={{ height: "100%", py: 3, px: 4 }}>
      <Stack spacing={1}>
        <StackM variants={yScaleVar}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            FILTER:
          </Typography>
        </StackM>

        <StackM variants={yScaleVar}>
          <Typography>saturation</Typography>
          <Slider value={saturate} onChange={createSliderHandler("saturate")} />
        </StackM>

        <StackM variants={yScaleVar}>
          <Typography>contrast</Typography>
          <Slider value={contrast} onChange={createSliderHandler("contrast")} />
        </StackM>

        <StackM variants={yScaleVar}>
          <Typography>exposure</Typography>
          <Slider value={exposure} onChange={createSliderHandler("exposure")} />
        </StackM>
      </Stack>

      <Stack spacing={1}>
        <StackM variants={yScaleVar}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            OUTPUT:
          </Typography>
        </StackM>

        <Box
          display="grid"
          sx={{ gridTemplateColumns: "0.6fr 1.2fr", alignItems: "center" }}
          gap={1.5}
        >
          <StackM variants={yScaleVar}>
            <Typography>max size</Typography>
          </StackM>
          <StackM variants={yScaleVar}>
            <Number
              min={1}
              max={999}
              step={1}
              value={maxSize}
              endText={"MB"}
              onChange={createNumberHandler("maxSize")}
            />
          </StackM>

          <StackM variants={yScaleVar}>
            <Typography>scale</Typography>
          </StackM>
          <StackM variants={yScaleVar}>
            <Number
              min={0.1}
              max={1.5}
              step={0.1}
              value={scale}
              endText={"x"}
              onChange={createNumberHandler("scale")}
            />
          </StackM>

          <StackM variants={yScaleVar}>
            <Typography>file type</Typography>
          </StackM>
          <StackM variants={yScaleVar}>
            <Select
              options={typeList}
              value={type}
              onChange={createNumberHandler("type")}
            />
          </StackM>
        </Box>
      </Stack>
    </Stack>
  );
}
