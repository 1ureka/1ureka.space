"use client";

import { Box, Stack, Typography } from "@mui/material";
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

interface EditOptionsProps {
  options: {
    saturate: number;
    contrast: number;
    exposure: number;
    maxSize: number;
    scale: number;
    type: 0 | 1 | 2;
  };
  onChange: (type: EditOptionType, val: number) => void;
}

const typeList = ["jpeg", "png", "webp"];

export default function EditOptions({ options, onChange }: EditOptionsProps) {
  const { saturate, contrast, exposure, maxSize, scale, type } = options;

  const createSliderHandler =
    (type: EditOptionType) => (_: Event, val: number) =>
      onChange(type, val);

  const createNumberHandler = (type: EditOptionType) => (value: number) =>
    onChange(type, value);

  const createSelectHandler =
    (type: EditOptionType) =>
    ({ target }: React.ChangeEvent<HTMLInputElement>) =>
      onChange(type, parseFloat(target.value));

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
              endAdornment={"MB"}
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
              endAdornment={"x"}
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
              onChange={createSelectHandler("type")}
            />
          </StackM>
        </Box>
      </Stack>
    </Stack>
  );
}
