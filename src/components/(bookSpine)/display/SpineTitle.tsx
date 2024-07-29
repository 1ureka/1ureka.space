import { Divider, Stack, Typography } from "@mui/material";

const titleSx = {
  fontWeight: "800",
  rotate: "180deg",
  writingMode: "vertical-rl",
  letterSpacing: "0.3rem",
  my: 3,
};

export default function SpineTitle({ isMobile }: { isMobile?: boolean }) {
  if (isMobile)
    return (
      <Stack direction="row" sx={{ flexGrow: 1 }} spacing={1}>
        <Divider orientation="vertical" sx={{ height: "auto" }} />

        <Stack
          direction="row"
          alignItems="center"
          sx={{ flexGrow: 1 }}
          spacing={2}
        >
          <Divider sx={{ flexGrow: 1, height: 0 }} />
          <Typography sx={{ fontWeight: 800, letterSpacing: "0.3rem" }}>
            {"1ureka's CG"}
          </Typography>
          <Divider sx={{ flexGrow: 1, height: 0 }} />
        </Stack>

        <Divider orientation="vertical" sx={{ height: "auto" }} />
      </Stack>
    );

  return (
    <Stack sx={{ flexGrow: 1, width: 1 }} spacing={2.5}>
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
