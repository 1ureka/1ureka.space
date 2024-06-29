import { Box, Stack, Typography } from "@mui/material";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import { RightClickIcon, LeftClickIcon } from "..";

export default function Asides({
  inset,
  current,
  total,
}: {
  inset: string;
  current: number;
  total: number;
}) {
  return (
    <Box sx={{ position: "absolute", inset, pointerEvents: "none" }}>
      <Hint />

      <Typography
        variant="body2"
        sx={{ position: "absolute", inset: "auto 0 0 auto" }}
      >
        SCROLL TO DISCOVER MORE
      </Typography>

      <Box sx={{ position: "absolute", inset: "auto auto 0 0" }}>
        <Indicator current={current} total={total} />
      </Box>
    </Box>
  );
}

function Indicator({ current, total }: { current: number; total: number }) {
  return <div>{current + 1 + " / " + total}</div>;
}

function Hint() {
  return (
    <Stack
      direction="row"
      alignItems="ceter"
      spacing={3.5}
      sx={{ color: "text.secondary" }}
    >
      <Stack direction="row" alignItems="ceter" spacing={1}>
        <RightClickIcon fontSize="small" />
        <Typography variant="caption">exit</Typography>
      </Stack>

      <Stack direction="row" alignItems="ceter" spacing={1}>
        <LeftClickIcon fontSize="small" />
        <PhotoRoundedIcon fontSize="small" />
        <Typography variant="caption">fullscreen</Typography>
      </Stack>
    </Stack>
  );
}
