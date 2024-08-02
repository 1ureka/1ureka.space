import { Box, Typography } from "@mui/material";
import MapRoundedIcon from "@mui/icons-material/MapRounded";

import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

export default function TitleBox() {
  return (
    <StackM variants={yScaleVar} gap={1} alignItems="center">
      <Box
        sx={{
          position: "relative",
          display: "flex",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "primary.light",
            opacity: 0.3,
            zIndex: -1,
          }}
        />
        <MapRoundedIcon
          sx={{ fontSize: "h3.fontSize", color: "primary.main", p: 1 }}
        />
      </Box>

      <Typography variant="subtitle2">EXPLORE</Typography>
    </StackM>
  );
}
