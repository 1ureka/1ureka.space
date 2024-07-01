import { Box, Typography } from "@mui/material";

import { BoxM, StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import { CategoryToggle, DryModeSwitch } from "@/components/(files)";
import { AddButton, VerButton } from "@/components/(files)";

export default function Options({ category }: { category: "scene" | "props" }) {
  return (
    <StackM variants={yScaleVar} gap={8}>
      <StackM variants={yScaleVar} gap={1} alignItems="flex-start">
        <Typography variant="subtitle2">CATEGORY:</Typography>
        <CategoryToggle value={category} />
      </StackM>

      <StackM variants={yScaleVar} gap={1} alignItems="flex-start">
        <Typography variant="subtitle2">OPERATION:</Typography>
        <AddButton>Add Image</AddButton>
        <VerButton>Verify Integrity</VerButton>
      </StackM>

      <Box sx={{ flexGrow: 1 }} />

      <BoxM variants={yScaleVar}>
        <DryModeSwitch />
      </BoxM>
    </StackM>
  );
}
