import Link from "next/link";
import { Button, Stack, Typography } from "@mui/material";
import type { StackProps } from "@mui/material";

import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";

import { CategoryToggle, RefreshButton } from "@/components/(files)";
import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

export default function Options({
  category,
  sx,
}: {
  category: "scene" | "props";
  sx?: StackProps["sx"];
}) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
      flexWrap="wrap"
      gap={{ xs: 3, sm: 5.5 }}
      sx={sx}
    >
      <Stack direction="row" flexWrap="wrap" gap={{ xs: 3, sm: 5.5, md: 8 }}>
        <StackM variants={yScaleVar} spacing={1}>
          <Typography variant="subtitle2">CATEGORY:</Typography>

          <CategoryToggle value={category} />
        </StackM>

        <StackM variants={yScaleVar} spacing={1}>
          <Typography variant="subtitle2">OPERATION:</Typography>

          <Stack direction="row" gap={1.5}>
            <Link
              href={{ pathname: "/files", query: { category, form: "upload" } }}
            >
              <Button startIcon={<AddToPhotosRoundedIcon fontSize="small" />}>
                Add Image
              </Button>
            </Link>

            <Link
              href={{ pathname: "/files", query: { category, form: "verify" } }}
            >
              <Button startIcon={<ImageSearchRoundedIcon fontSize="small" />}>
                Verify Integrity
              </Button>
            </Link>
          </Stack>
        </StackM>
      </Stack>

      <RefreshButton />
    </Stack>
  );
}
