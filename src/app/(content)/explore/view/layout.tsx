import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "explore",
};

import { Box, Skeleton, Slider, Stack } from "@mui/material";
import Block from "@/components/Block";
import { ActionSection, Carousels } from "@/components/(explore)";
import { BoxM } from "@/components/Motion";
import { createCommonVar, createStaggerVar } from "@/components/MotionProps";

const gridTemplateAreas = {
  xs: `"intro thumbnail" "intro slider" "slides slides"`,
};

const gridTemplateColumns = {
  xs: "1fr 2.2fr",
};

const containerSx = {
  display: "grid",
  gridTemplateAreas,
  gridTemplateColumns,
  gap: 2.5,
  height: "fit-content",
};

export default function ExploreLayout({
  intro,
  children,
}: {
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <BoxM {...createStaggerVar({ stagger: 0.25 })} sx={containerSx}>
      <Block sx={{ gridArea: "intro" }} decoration="left">
        <Stack gap={2} justifyContent="space-between" height={1}>
          {intro}
          <ActionSection />
        </Stack>
      </Block>

      <Block
        sx={{ gridArea: "thumbnail" }}
        variant="outlined"
        color="primary.light"
        variants={createCommonVar({ from: { scale: 1, y: 0 } })}
        SlotProps={{ childContainer: { sx: { p: 0 } } }}
      >
        <Box
          position={"relative"}
          sx={{ aspectRatio: "16/9", overflow: "hidden" }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ position: "absolute", height: 1, width: 1 }}
          />
          {children}
        </Box>
      </Block>

      <Block
        sx={{ gridArea: "slider" }}
        decoration="right"
        color="primary.light"
        variants={createCommonVar({ from: { scale: 1 } })}
      >
        <Slider
          marks={[
            { label: "Day", value: 0 },
            { label: "Morning", value: 33 },
            { label: "Night", value: 66 },
            { label: "", value: 100 },
          ]}
          step={0.1}
          defaultValue={25}
          size="small"
        />
      </Block>

      <Block
        sx={{ gridArea: "slides" }}
        color="secondary.dark"
        variants={createCommonVar({ from: { scale: 1 } })}
      >
        <Carousels amount={10} />
      </Block>
    </BoxM>
  );
}
