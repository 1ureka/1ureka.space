import { NextLinkComposed } from "@/components/Link";
import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

import { auth } from "@/auth";
import { Button } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

export default async function CreateHeader() {
  const session = await auth();
  const isAuth =
    !!session && JSON.stringify(session.user.id) === process.env.ALLOWED_USER;

  if (!isAuth) {
    return null;
  }

  return (
    <>
      <StackM variants={yScaleVar}>
        <Button
          component={NextLinkComposed}
          to={`/explore/view/0`}
          startIcon={<ArrowBackIosNewRoundedIcon />}
          variant="outlined"
          disableElevation
          color="inherit"
        >
          Go Back
        </Button>
      </StackM>
    </>
  );
}
