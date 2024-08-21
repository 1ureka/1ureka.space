import Link from "next/link";
import { Divider, IconButton, Stack } from "@mui/material";
import type { BoxProps } from "@mui/material";

import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import { EditIconButton, Indicator } from "..";
import { BoxM, StackM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

const wrapperSx = (type: "contained" | "outlined"): BoxProps["sx"] => ({
  border: "2px solid",
  borderColor: "primary.light",
  borderRadius: 999,
  bgcolor: type === "contained" ? "primary.light" : "#e783ad10",
  color: type === "contained" ? "primary.contrastText" : "primary.light",
  p: 1,
});

export default function ActionSection() {
  return (
    <Stack direction="row" alignItems="flex-end" gap={2} flexWrap="wrap">
      <BoxM
        variants={createMotionVar()}
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

      <StackM
        variants={createMotionVar()}
        direction="row"
        sx={wrapperSx("contained")}
      >
        <IconButton
          size="small"
          color="inherit"
          component={Link}
          href="/explore/new"
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
