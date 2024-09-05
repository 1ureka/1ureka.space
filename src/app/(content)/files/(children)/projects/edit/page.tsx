import { validateSession } from "@/auth";
import { Box, Typography } from "@mui/material";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";
import Block from "@/components/Block";

export default async function Page() {
  await validateSession();

  return (
    <Block sx={{ gridArea: "content" }}>
      <Box sx={{ display: "grid", placeItems: "center", height: 1 }}>
        <BoxM variants={createMotionVar()} sx={{ alignSelf: "end" }}>
          <ConstructionRoundedIcon color="primary" fontSize="large" />
        </BoxM>

        <BoxM variants={createMotionVar()} sx={{ alignSelf: "end" }}>
          <Typography variant="h6">Not implemented yet</Typography>
        </BoxM>
      </Box>
    </Block>
  );
}
