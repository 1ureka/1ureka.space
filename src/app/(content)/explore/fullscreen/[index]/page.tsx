import { validateSession } from "@/auth";
import { delay } from "@/utils/server-utils";
import { isValidIndex } from "@/utils/utils";

import { Box, IconButton, Slider, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";

import Block from "@/components/Block";
import Fullscreen from "@/components/(explore)/Fullscreen";
import { BoxM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";

const iconButtonSx: React.ComponentProps<typeof IconButton>["sx"] = {
  transition: "all 0.25s ease",
  scale: "1.001",
  "&:hover": { scale: "1.1" },
  "&:active": { scale: "0.95" },
};

export default async function Page({
  params: { index: indexString },
}: {
  params: { index: unknown };
}) {
  await validateSession();

  const index = isValidIndex(indexString, 10);
  if (index === -1) notFound();

  await delay(Math.random() * 3500);

  return (
    <BoxM
      {...createMotionProps()}
      sx={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
      }}
    >
      <Fullscreen />

      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          position: "absolute",
          inset: 0,
          m: 3,
          mx: 10,
        }}
      >
        <Block
          decoration="none"
          variant="contained"
          color="primary.light"
          sx={{ alignSelf: "start", justifySelf: "center" }}
          SlotProps={{
            childContainer: {
              sx: { display: "flex", gap: 2, alignItems: "center" },
            },
          }}
        >
          <IconButton
            component={Link}
            href={`/explore/view/${index}`}
            size="small"
            sx={iconButtonSx}
          >
            <ArrowBackRoundedIcon fontSize="small" />
          </IconButton>

          <Typography variant="h6">{`view ${index + 1}'s name`}</Typography>

          <IconButton size="small" sx={iconButtonSx}>
            <PauseRoundedIcon fontSize="small" />
          </IconButton>
        </Block>

        <Block
          decoration="none"
          color="primary.main"
          sx={{ alignSelf: "end", justifySelf: "center" }}
          SlotProps={{ childContainer: { sx: { width: 500, py: 0.5 } } }}
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
      </Box>
    </BoxM>
  );
}
