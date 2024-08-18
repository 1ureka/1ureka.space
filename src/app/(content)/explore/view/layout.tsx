import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "explore",
};

import { Box, Skeleton, Slider, Stack } from "@mui/material";
import { ActionSection, Carousels } from "@/components/(explore)";
import { BoxM } from "@/components/Motion";
import { createStaggerVar } from "@/components/MotionProps";
import { opacityVar, yVar } from "@/components/MotionProps";

export default function ExploreLayout({
  intro,
  children,
}: {
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <BoxM
      {...createStaggerVar({ stagger: 0.25 })}
      sx={{
        display: "grid",
        gridTemplateAreas: `"a b" "a c" "d d"`,
        gridTemplateColumns: "1fr 2.2fr",
        rowGap: 1,
        columnGap: 5,
        p: 7,
        height: "fit-content",
      }}
    >
      <Stack sx={{ gridArea: "a" }} justifyContent="space-between" gap={2}>
        {intro}
        <ActionSection />
      </Stack>

      <Box sx={{ gridArea: "b" }}>
        <BoxM
          variants={opacityVar}
          sx={{
            position: "relative",
            aspectRatio: "16/9",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ position: "absolute", height: 1, width: 1 }}
          />
          {children}
        </BoxM>
      </Box>

      <BoxM variants={yVar} sx={{ gridArea: "c" }}>
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
      </BoxM>

      <Box sx={{ gridArea: "d", mt: 5 }}>
        <Carousels amount={10} />
      </Box>
    </BoxM>
  );
}
