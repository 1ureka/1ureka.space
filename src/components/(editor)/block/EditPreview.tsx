"use client";
import { Button, Typography, styled } from "@mui/material";
import { useDropArea, useEditorInput } from "@/utils/hooks";

import { BoxM, StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import PreviewBox from "../display/PreviewBox";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function EditingPreview() {
  const handleInput = useEditorInput();
  const { isDragOver, DropProps } = useDropArea(handleInput);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => target.files && handleInput(target.files);

  return (
    <StackM
      variants={yScaleVar}
      spacing={1}
      sx={{
        borderRadius: 4,
        height: 1,
        backgroundImage: isDragOver
          ? `repeating-linear-gradient(
          -45deg,
          #e783ad30,
          #e783ad30 20px,
          #e783ad20 20px,
          #e783ad20 40px
        )`
          : "",
      }}
      {...DropProps}
    >
      <PreviewBox />

      <BoxM variants={yScaleVar}>
        <Typography variant="caption">
          {"* Drop images in the box above or "}
          <Button
            component="label"
            tabIndex={-1}
            variant="outlined"
            size="small"
            sx={(theme) => ({
              ...theme.typography.caption,
              color: theme.typography.button.color,
            })}
          >
            Browse Files
            <VisuallyHiddenInput
              type="file"
              onChange={handleChange}
              multiple
              accept="image/*"
            />
          </Button>
        </Typography>
      </BoxM>
    </StackM>
  );
}
