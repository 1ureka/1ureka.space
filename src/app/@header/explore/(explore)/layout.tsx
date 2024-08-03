import { NextLinkComposed } from "@/components/Link";
import { DividerM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yVar } from "@/components/MotionProps";
import { yScaleVar } from "@/components/MotionProps";

import { Box, Button, Slider } from "@mui/material";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";

export default function ExploreHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StackM
      {...layoutChildMotionProps()}
      direction="row"
      alignItems="center"
      gap={{ xs: 1, sm: 3 }}
      sx={{ px: { xs: 2, sm: 7 }, pb: 1, mt: -3, color: "text.secondary" }}
    >
      <TitleIcon />
      <DividerM variants={yScaleVar} orientation="vertical" flexItem />

      <StackM variants={yScaleVar}>
        <Button
          component={NextLinkComposed}
          to={`/explore/new`}
          startIcon={<NoteAddRoundedIcon />}
          variant="outlined"
          disableElevation
          color="inherit"
        >
          Create New
        </Button>
      </StackM>

      <StackM variants={yScaleVar}>{children}</StackM>

      <Box sx={{ flexGrow: 1 }} />

      <StackM
        variants={yVar}
        spacing={2}
        direction="row"
        alignItems="center"
        sx={{ width: 200 }}
      >
        <VolumeDownRoundedIcon />
        <Slider aria-label="Volume" size="small" />
        <VolumeUpRoundedIcon />
      </StackM>
    </StackM>
  );
}

function TitleIcon() {
  return (
    <StackM
      variants={yScaleVar}
      sx={{ position: "relative", overflow: "hidden", borderRadius: "999px" }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "text.secondary",
          opacity: 0.3,
          zIndex: -1,
        }}
      />
      <MapRoundedIcon
        sx={{ fontSize: "h4.fontSize", color: "text.secondary", m: 1 }}
      />
    </StackM>
  );
}
