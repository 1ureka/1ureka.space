import Link from "next/link";
import { Button, Stack, Typography } from "@mui/material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";
import { auth } from "@/auth";

import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

export default async function Header({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const userId = session?.user.id;
  const expectedUserId = process.env.ALLOWED_USER;
  if (!userId || !expectedUserId || JSON.stringify(userId) !== expectedUserId) {
    return null;
  }

  const { category: categoryParam } = searchParams;
  const category =
    categoryParam === "scene" || categoryParam === "props"
      ? categoryParam
      : "scene";

  return (
    <StackM variants={yScaleVar} gap={1}>
      <Typography variant="subtitle2">OPERATION:</Typography>

      <Stack direction="row" gap={1.5}>
        <Button
          startIcon={<AddToPhotosRoundedIcon fontSize="small" />}
          variant="contained"
          disableElevation
          component={Link}
          href={`/files/images?category=${category}&form=upload`}
        >
          Add Image
        </Button>

        <Button
          startIcon={<ImageSearchRoundedIcon fontSize="small" />}
          variant="outlined"
          component={Link}
          href={`/files/images?category=${category}&form=verify`}
        >
          Verify Integrity
        </Button>
      </Stack>
    </StackM>
  );
}
