import { Fab, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import { NextLinkComposed } from "@/components/Link";
import { auth } from "@/auth";

export default async function CreateButton() {
  const userId = (await auth())?.user.id;
  const expected = process.env.ALLOWED_USER;

  console.log(`userId: ${userId}, expected: ${expected}`);
  const disabled = String(userId) !== String(expected);

  return (
    <StackM gap={1} alignItems="center" variants={yScaleVar}>
      <Fab
        color="primary"
        size="medium"
        component={NextLinkComposed}
        to={"/explore/new"}
        disabled={disabled}
      >
        <AddRoundedIcon />
      </Fab>
      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
        Create New
      </Typography>
    </StackM>
  );
}
