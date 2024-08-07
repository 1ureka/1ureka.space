import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { Box } from "@mui/material";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

import { BoxM, TypographyM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

export default async function Content() {
  const session = await auth();
  const userId = session?.user.id;
  const expectedUserId = process.env.ALLOWED_USER;
  if (!userId || !expectedUserId || JSON.stringify(userId) !== expectedUserId) {
    redirect("/unAuth");
  }

  return (
    <BoxM
      variants={yScaleVar}
      sx={{ display: "grid", placeItems: "center", height: 1 }}
    >
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <BoxM variants={yScaleVar}>
          <ConstructionRoundedIcon color="primary" fontSize="large" />
        </BoxM>
        <TypographyM variants={yScaleVar} variant="h6">
          Not implemented yet
        </TypographyM>
      </Box>
    </BoxM>
  );
}
