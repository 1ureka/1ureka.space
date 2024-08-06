"use client";

import { useState } from "react";
import type { ImageMetadata } from "@/data/type";

import { ImagesDialog, VariantField } from "..";
import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

import { Button, Box, Stack, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

export default function VariantSection({
  metadataList,
}: {
  metadataList: ImageMetadata[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <StackM variants={yScaleVar}>
      <Box>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="subtitle1">Variants: </Typography>
          <Button
            startIcon={<AddBoxRoundedIcon />}
            size="small"
            onClick={() => setOpen(true)}
          >
            <Typography variant="body1" color="inherit">
              Add
            </Typography>
          </Button>
          <ImagesDialog
            open={open}
            onClose={(id) => {
              console.log(id);
              setOpen(false);
            }}
            metadataList={metadataList}
          />
        </Stack>

        <Typography variant="caption" color="error.main">
          * At least one Variant is required.
        </Typography>
      </Box>

      <Stack gap={1}>
        <VariantField checked />
        <VariantField checked={false} />
      </Stack>
    </StackM>
  );
}
