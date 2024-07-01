import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { Box, Button, Typography } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";

import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { DryModeSwitch } from "@/components/(files)";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function ShelfContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { category } = searchParams;
  if (category !== "scene" && category !== "props") {
    redirect("/files?category=scene");
  }

  return (
    <StackM direction="row" sx={{ py: 7, px: 9 }} {...layoutChildMotionProps()}>
      <StackM variants={yScaleVar} gap={8}>
        <StackM variants={yScaleVar} gap={1} alignItems="flex-start">
          <Typography variant="subtitle2">CATEGORY:</Typography>
          <ToggleButtonGroup
            color="primary"
            value={category}
            exclusive
            size="small"
          >
            <Link href="/files?category=scene">
              <ToggleButton value="scene" sx={{ py: 1 }}>
                Scene
              </ToggleButton>
            </Link>
            <Link href="/files?category=props">
              <ToggleButton value="props" sx={{ py: 1 }}>
                Props
              </ToggleButton>
            </Link>
          </ToggleButtonGroup>
        </StackM>

        <StackM variants={yScaleVar} gap={1} alignItems="flex-start">
          <Typography variant="subtitle2">OPERATION:</Typography>

          <Button startIcon={<AddToPhotosRoundedIcon fontSize="small" />}>
            Add Image
          </Button>

          <Button startIcon={<ImageSearchRoundedIcon fontSize="small" />}>
            Verify Integrity
          </Button>
        </StackM>

        <Box sx={{ flexGrow: 1 }} />

        <BoxM variants={yScaleVar}>
          <DryModeSwitch />
        </BoxM>
      </StackM>
    </StackM>
  );
}
