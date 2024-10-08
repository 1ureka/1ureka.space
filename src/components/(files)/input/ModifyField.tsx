"use client";

import type { FieldArrayWithId, FieldErrors } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { MetadataWithIdSchema } from "@/schema/metadataSchema";

import Image from "next/image";
import { Box, Chip, Skeleton, Stack } from "@mui/material";
import { MenuItem, TextField } from "@mui/material";

import { StackM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";
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

type Z = z.infer<typeof MetadataWithIdSchema>;
interface ModifyFieldProps {
  index: number;
  field: FieldArrayWithId<Z, "fieldArray", "id">;
  errors: FieldErrors<Z>;
  register: UseFormRegister<Z>;
  isDirty: boolean;
  disabled?: boolean;
}

export default function ModifyField({
  index,
  field,
  errors,
  register,
  isDirty,
  disabled,
}: ModifyFieldProps) {
  const immutableCategory = useRef(field.category);
  const error = errors.fieldArray && errors.fieldArray[index];

  return (
    <StackM variants={createMotionVar()} sx={containerSx}>
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

        <Chip
          variant="outlined"
          label={isDirty ? "modified" : "unmodified"}
          size="small"
          color={isDirty ? "primary" : "default"}
        />
      </Stack>

      <Box sx={imageContainerSx}>
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ height: "auto", aspectRatio: 16 / 9 }}
        />
        <Image
          unoptimized
          src={`/api/image/${field.cuid}/thumbnail`}
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

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
