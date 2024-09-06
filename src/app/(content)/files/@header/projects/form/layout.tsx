import Link from "next/link";
import { Button, Stack } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import { validateSession } from "@/auth";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await validateSession();

  return (
    <Stack direction="row" gap={1.5}>
      <BoxM variants={createMotionVar()}>
        <Button
          startIcon={<ArrowBackIosNewRoundedIcon fontSize="small" />}
          variant="contained"
          disableElevation
          component={Link}
          href={`/files/projects`}
          sx={{
            transition: "all 0.25s ease",
            scale: "1.001",
            "&:hover": { bgcolor: "primary.light", scale: "1.03" },
            "&:active": { scale: "0.97" },
          }}
        >
          Back to Projects
        </Button>
      </BoxM>

      {children}
    </Stack>
  );
}
