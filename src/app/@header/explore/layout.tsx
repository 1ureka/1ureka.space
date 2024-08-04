import { DividerM, StackM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar } from "@/components/MotionProps";

import { Box } from "@mui/material";
import MapRoundedIcon from "@mui/icons-material/MapRounded";

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

      <DividerM variants={yScaleVar} orientation="vertical" flexItem />

      {children}
    </StackM>
  );
}
