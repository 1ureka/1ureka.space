"use client";

import type { FieldArrayWithId } from "react-hook-form";
import type { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { uploadSchema } from "@/schema/uploadSchema";

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

interface UploadFieldProps {
  index: number;
  field: FieldArrayWithId<z.infer<typeof uploadSchema>, "upload", "id">;
  register: UseFormRegister<z.infer<typeof uploadSchema>>;
  remove: UseFieldArrayRemove;
}

export default function UploadField({
  index,
  field,
  register,
  remove,
}: UploadFieldProps) {
  const dataUrl = useBlob(field.file);
  const [src, state] = useDecode(dataUrl);

  const immutableCategory = useRef(field.category);

  return (
    <StackM variants={yScaleVar} sx={containerSx}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          fullWidth
          size="small"
          label="Category"
          select
          {...register(`upload.${index}.category`)}
          defaultValue={immutableCategory.current}
        >
          <MenuItem value="scene">Scene</MenuItem>
          <MenuItem value="props">Props</MenuItem>
        </TextField>

        <IconButton sx={{ mx: 1.5 }}>
          <CloseRoundedIcon
            fontSize="small"
            sx={{ color: "grey.500" }}
            onClick={() => remove(index)}
          />
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
          {...register(`upload.${index}.name`)}
          defaultValue={field.name}
        />
        <TextField
          variant="filled"
          fullWidth
          size="small"
          label="Group"
          {...register(`upload.${index}.group`)}
          defaultValue={field.group}
        />
      </Stack>
    </StackM>
  );
}
