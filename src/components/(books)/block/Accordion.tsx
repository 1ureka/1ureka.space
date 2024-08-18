"use client";

import { useEffect, useState } from "react";
import { Accordion as MuiAccordion } from "@mui/material";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import { Stack, Typography } from "@mui/material";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";

import { BoxM } from "@/components/Motion";
import { createStaggerVar, yVar } from "@/components/MotionProps";
import { Slider } from "@/components/(editor)";

type EditOptionType = "saturation" | "contrast" | "exposure";
type FilterString =
  `saturate(${number}) contrast(${number}) brightness(${number})`;

const defaultFilter: FilterString = "saturate(1) contrast(1) brightness(1)";

const isFilterString = (filter: string): filter is FilterString => {
  return /^saturate\(\d+(\.\d+)?\) contrast\(\d+(\.\d+)?\) brightness\(\d+(\.\d+)?\)$/.test(
    filter
  );
};

const getSave = () => {
  if (typeof window === "undefined") return defaultFilter;

  const CSSFilterString = localStorage.getItem(`imageFilter`);
  if (CSSFilterString && isFilterString(CSSFilterString))
    return CSSFilterString;

  return defaultFilter;
};

const parseFilter = (filter: FilterString) => {
  const [s, c, e] = filter.split(" ");
  return {
    saturation: Number(s.match(/\d+(\.\d+)?/)?.[0] ?? 1),
    contrast: Number(c.match(/\d+(\.\d+)?/)?.[0] ?? 1),
    exposure: Number(e.match(/\d+(\.\d+)?/)?.[0] ?? 1),
  };
};

export default function Accordion() {
  const [filter, setFilter] = useState(getSave());

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "imageFilterCSS";
    style.innerHTML = `:where(#Gallery, #Carousels) img{ filter: ${filter} }`;
    document.head.appendChild(style);

    return () => {
      const style = document.getElementById("imageFilterCSS");
      if (style) document.head.removeChild(style);
    };
  }, [filter]);

  const createSliderHandler =
    (type: EditOptionType) => (_: Event, val: number) => {
      setFilter((prev) => {
        const filter = parseFilter(prev);
        filter[type] = val;

        const FilterString: FilterString = `saturate(${filter.saturation}) contrast(${filter.contrast}) brightness(${filter.exposure})`;
        localStorage.setItem(`imageFilter`, FilterString);
        return FilterString;
      });
    };

  const { saturation, contrast, exposure } = parseFilter(filter);

  return (
    <BoxM {...createStaggerVar()}>
      <BoxM variants={yVar}>
        <MuiAccordion
          elevation={0}
          sx={{ px: { xs: 0, sm: 7 }, mt: 1, background: "transparent" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              sx={{ color: "text.secondary" }}
            >
              <AutoFixHighRoundedIcon />
              <Typography variant="button">Filter</Typography>
            </Stack>
          </AccordionSummary>

          <AccordionDetails>
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
                <Slider
                  value={contrast}
                  onChange={createSliderHandler("contrast")}
                />
              </Stack>

              <Stack sx={{ minWidth: 200, flex: 1 }}>
                <Typography>exposure</Typography>
                <Slider
                  value={exposure}
                  onChange={createSliderHandler("exposure")}
                />
              </Stack>

              <Typography variant="caption" sx={{ width: 1 }}>
                * Filter will be applied to all images in gallery and carousels,
                and settings will be stored in local storage.
              </Typography>
            </Stack>
          </AccordionDetails>
        </MuiAccordion>
      </BoxM>
    </BoxM>
  );
}
