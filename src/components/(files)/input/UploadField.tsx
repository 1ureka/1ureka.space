"use client";

import type { FieldArrayWithId, FieldErrors } from "react-hook-form";
import type { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { MetadataWithFileSchema } from "@/schema/schema";

import Image from "next/image";
import { Box, Skeleton, Stack } from "@mui/material";
import { IconButton, MenuItem, TextField } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import { useBlob, useDecode } from "@/hooks";
import { useRef } from "react";

const containerSx = {
  borderRadius: 2,
  border: "solid 2px",
  borderColor: "divider",
  p: 2,
  gap: 2,
} as const;

const imageContainerSx = {
  borderRadius: 2,
  position: "relative",
  aspectRatio: 16 / 9,
  overflow: "hidden",
} as const;

type Z = z.infer<typeof MetadataWithFileSchema>;
interface UploadFieldProps {
  index: number;
  field: FieldArrayWithId<Z, "fieldArray", "id">;
  errors: FieldErrors<Z>;
  register: UseFormRegister<Z>;
  remove: UseFieldArrayRemove;
  disabled?: boolean;
}

export default function UploadField({
  index,
  field,
  errors,
  register,
  remove,
  disabled,
}: UploadFieldProps) {
  const dataUrl = useBlob(field.file);
  const [src, state] = useDecode(dataUrl);

  const immutableCategory = useRef(field.category);
  const error = errors.fieldArray && errors.fieldArray[index];

  return (
    <StackM variants={yScaleVar} sx={containerSx}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          fullWidth
          size="small"
          label="Category"
          select
          {...register(`fieldArray.${index}.category`)}
          defaultValue={immutableCategory.current}
          error={!!error?.category}
          helperText={error?.category?.message}
          disabled={disabled}
        >
          <MenuItem value="scene">Scene</MenuItem>
          <MenuItem value="props">Props</MenuItem>
        </TextField>

        <IconButton
          sx={{ mx: 1.5 }}
          onClick={() => remove(index)}
          disabled={disabled}
        >
          <CloseRoundedIcon fontSize="small" sx={{ color: "grey.500" }} />
        </IconButton>
      </Stack>

      {src && state ? (
        <Box sx={imageContainerSx}>
          <Image src={src} alt="" fill style={{ objectFit: "cover" }} />
        </Box>
      ) : (
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ height: "auto", aspectRatio: 16 / 9 }}
        />
      )}

      <Stack spacing={0.5}>
        <TextField
          variant="filled"
          fullWidth
          size="small"
          label="File name"
          {...register(`fieldArray.${index}.name`)}
          error={!!error?.name}
          helperText={error?.name?.message}
          disabled={disabled}
        />
        <TextField
          variant="filled"
          fullWidth
          size="small"
          label="Group"
          {...register(`fieldArray.${index}.group`)}
          error={!!error?.group}
          helperText={error?.group?.message}
          disabled={disabled}
        />
      </Stack>
    </StackM>
  );
}
