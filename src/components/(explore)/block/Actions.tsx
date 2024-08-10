import { Box, Divider, IconButton, Stack } from "@mui/material";
import type { BoxProps } from "@mui/material";

import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import { EditIconButton, Indicator } from "..";
import { NextLinkComposed } from "@/components/Link";
import { BoxM, StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

export default function ActionSection() {
  const wrapperSx = (type: "contained" | "outlined"): BoxProps["sx"] => ({
    border: "2px solid",
    borderColor: "primary.light",
    borderRadius: 999,
    bgcolor: type === "contained" ? "primary.light" : "#e783ad10",
    color: type === "contained" ? "primary.contrastText" : "primary.light",
    p: 1,
  });

  return (
    <Stack direction="row" alignItems="flex-end" gap={2} flexWrap="wrap">
      <BoxM
        variants={yScaleVar}
        sx={{
          ...wrapperSx("outlined"),
          display: "grid",
          placeItems: "center",
          aspectRatio: "1/1",
          height: 1,
          maxHeight: 100,
        }}
      >
        <Indicator amount={10} />
      </BoxM>

      <StackM variants={yScaleVar} direction="row" sx={wrapperSx("contained")}>
        <IconButton
          size="small"
          component={NextLinkComposed}
          to="/explore/new"
          color="inherit"
        >
          <AddCircleRoundedIcon fontSize="small" />
        </IconButton>
        <EditIconButton />

        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, borderColor: "primary.main" }}
        />

        <IconButton size="small" color="inherit">
          <PauseRoundedIcon fontSize="small" />
        </IconButton>
      </StackM>
    </Stack>
  );
}
