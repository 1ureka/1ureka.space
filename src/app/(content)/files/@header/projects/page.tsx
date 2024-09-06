import Link from "next/link";
import { Button, Stack } from "@mui/material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";

import { validateSession } from "@/auth";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default async function Page() {
  await validateSession();

  return (
    <Stack direction="row" gap={1.5}>
      <BoxM variants={createMotionVar()}>
        <Button
          startIcon={<AddToPhotosRoundedIcon fontSize="small" />}
          variant="contained"
          disableElevation
          component={Link}
          href={`/files/projects/form/new`}
          sx={{
            transition: "all 0.25s ease",
            scale: "1.001",
            "&:hover": { bgcolor: "primary.light", scale: "1.03" },
            "&:active": { scale: "0.97" },
          }}
        >
          Add Explore Project
        </Button>
      </BoxM>
    </Stack>
  );
}
