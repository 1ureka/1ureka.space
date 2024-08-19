"use client";

import { Stack, Typography } from "@mui/material";
import { Slider } from "@/components/(editor)";
import { useBooksFilter } from "@/hooks";

export default function FilterAccordion() {
  const {
    filter: { saturation, contrast, exposure },
    createSliderHandler,
  } = useBooksFilter();

  return (
    <Stack direction="row" flexWrap="wrap" gap={1.5}>
      <Stack sx={{ minWidth: 200, flex: 1 }}>
        <Typography>saturation</Typography>
        <Slider
          value={saturation}
          onChange={createSliderHandler("saturation")}
        />
      </Stack>

      <Stack sx={{ minWidth: 200, flex: 1 }}>
        <Typography>contrast</Typography>
        <Slider value={contrast} onChange={createSliderHandler("contrast")} />
      </Stack>

      <Stack sx={{ minWidth: 200, flex: 1 }}>
        <Typography>exposure</Typography>
        <Slider value={exposure} onChange={createSliderHandler("exposure")} />
      </Stack>

      <Typography variant="caption" sx={{ width: 1 }}>
        * Filter will be applied to all images in gallery and carousels, and
        settings will be stored in local storage.
      </Typography>
    </Stack>
  );
}
