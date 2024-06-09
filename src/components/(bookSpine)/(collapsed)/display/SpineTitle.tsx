import { SxProps } from "@mui/system";
import { Divider, Stack, Theme, Typography } from "@mui/material";

const titleSx = {
  fontWeight: "800",
  rotate: "180deg",
  writingMode: "vertical-rl",
  letterSpacing: "0.3rem",
  my: 3,
};

export default function SpineTitle({ sx }: { sx: SxProps<Theme> }) {
  return (
    <Stack sx={sx} spacing={2.5}>
      <Divider flexItem />

      <Stack alignItems="center" sx={{ flexGrow: 1 }}>
        <Divider orientation="vertical" sx={{ flexGrow: 1, height: "auto" }} />
        <Typography sx={titleSx}>{"1ureka's CG"}</Typography>
        <Divider orientation="vertical" sx={{ flexGrow: 1, height: "auto" }} />
      </Stack>

      <Divider flexItem />
    </Stack>
  );
}
