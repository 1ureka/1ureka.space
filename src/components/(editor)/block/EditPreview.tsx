"use client";
import { Button, Typography } from "@mui/material";

import { BoxM, StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

import PreviewBox from "../display/PreviewBox";

export default function EditingPreview() {
  return (
    <StackM variants={yScaleVar} spacing={1} sx={{ p: 3, height: 1 }}>
      <PreviewBox />
      <BoxM variants={yScaleVar}>
        <Typography variant="caption">
          {"* Drop images in the box above or "}
          <Button
            variant="outlined"
            size="small"
            sx={(theme) => ({
              ...theme.typography.caption,
              color: theme.typography.button.color,
            })}
          >
            Browse Files
          </Button>
        </Typography>
      </BoxM>
    </StackM>
  );
}
