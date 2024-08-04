import { NextLinkComposed } from "@/components/Link";
import { StackM } from "@/components/Motion";
import { yScaleVar, yVar } from "@/components/MotionProps";

import { Box, Button, Slider } from "@mui/material";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";

import { auth } from "@/auth";

export default async function ExploreHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAuth =
    !!session && JSON.stringify(session.user.id) === process.env.ALLOWED_USER;

  return (
    <>
      <StackM variants={yScaleVar}>
        <Button
          disabled={!isAuth}
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

      <StackM variants={yScaleVar}>{isAuth && children}</StackM>

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
    </>
  );
}
