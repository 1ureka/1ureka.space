import { Stack, Typography } from "@mui/material";
import type { StackProps } from "@mui/material";
import { CategoryToggle, UpdateButton } from "@/components/(files)";
import { AddButton, VerButton } from "@/components/(files)";

import { BoxM, StackM } from "@/components/Motion";
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
      sx={sx}
    >
      <Stack direction="row" spacing={8}>
        <StackM variants={yScaleVar} spacing={1}>
          <Typography variant="subtitle2">CATEGORY:</Typography>

          <CategoryToggle value={category} />
        </StackM>

        <StackM variants={yScaleVar} spacing={1}>
          <Typography variant="subtitle2">OPERATION:</Typography>

          <Stack direction="row" gap={1.5}>
            <AddButton>Add Image</AddButton>
            <VerButton>Verify Integrity</VerButton>
          </Stack>
        </StackM>
      </Stack>

      <BoxM variants={yScaleVar}>
        <UpdateButton category={category} />
      </BoxM>
    </Stack>
  );
}
