import Link from "next/link";
import { Button, Stack } from "@mui/material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";

import { validateSession } from "@/auth";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await validateSession();

  const { category: categoryParam } = searchParams;
  const category =
    categoryParam === "scene" || categoryParam === "props"
      ? categoryParam
      : "scene";

  return (
    <Stack direction="row" gap={1.5}>
      <BoxM variants={createMotionVar()}>
        <Button
          startIcon={<AddToPhotosRoundedIcon fontSize="small" />}
          variant="contained"
          disableElevation
          component={Link}
          href={`/files/images?category=${category}&form=upload`}
          sx={{
            transition: "all 0.25s ease",
            scale: "1.001",
            "&:hover": { bgcolor: "primary.light", scale: "1.03" },
            "&:active": { scale: "0.97" },
          }}
        >
          Add Image
        </Button>
      </BoxM>

      <BoxM variants={createMotionVar()}>
        <Button
          startIcon={<ImageSearchRoundedIcon fontSize="small" />}
          variant="outlined"
          component={Link}
          href={`/files/images?category=${category}&form=verify`}
          sx={{
            transition: "all 0.25s ease",
            scale: "1.001",
            "&:hover": { scale: "1.03" },
            "&:active": { scale: "0.97" },
          }}
        >
          Verify Integrity
        </Button>
      </BoxM>
    </Stack>
  );
}
