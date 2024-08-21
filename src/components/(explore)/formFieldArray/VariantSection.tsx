"use client";

import { useState } from "react";
import type { ImageMetadata } from "@/data/type";

import { ImagesDialog, VariantField } from "..";
import { BoxM, StackM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

import { Button, Stack, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import type { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { ExploreSchema } from "@/schema/exploreSchema";

type Z = z.infer<typeof ExploreSchema>;

export default function VariantSection({
  metadataList,
  viewIndex,
  isCurrentView,
  errors,
  register,
  control,
}: {
  metadataList: ImageMetadata[];
  viewIndex: number;
  isCurrentView: boolean;
  errors: FieldErrors<Z>;
  register: UseFormRegister<Z>;
  control: Control<Z>;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `views.${viewIndex}.variant`,
  });

  const handleDialogClose = (id: string | undefined) => {
    if (id !== undefined) append({ name: "", group: "", metadataId: id });
    setDialogOpen(false);
  };

  const errorMessage =
    errors?.views?.[viewIndex]?.message ||
    errors?.views?.[viewIndex]?.root?.message ||
    errors?.views?.[viewIndex]?.variant?.message ||
    errors?.views?.[viewIndex]?.variant?.root?.message;

  if (!isCurrentView) return null;

  return (
    <StackM variants={createMotionVar()}>
      <BoxM layout="preserve-aspect">
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="subtitle1">Variants: </Typography>
          <Button
            startIcon={<AddBoxRoundedIcon />}
            size="small"
            onClick={() => setDialogOpen(true)}
          >
            <Typography variant="body1" color="inherit">
              Add
            </Typography>
          </Button>

          <ImagesDialog
            metadataList={metadataList}
            open={dialogOpen}
            onClose={handleDialogClose}
          />
        </Stack>

        <Typography variant="caption" color="error.main">
          {errorMessage}
        </Typography>
      </BoxM>

      <StackM layout="preserve-aspect" gap={1}>
        {fields.map((field, i) => (
          <VariantField
            key={field.id}
            checked={i === 0}
            onDelete={() => remove(i)}
            NameFieldProps={{
              ...register(`views.${viewIndex}.variant.${i}.name`),
              error: !!errors?.views?.[viewIndex]?.variant?.[i]?.name,
              helperText:
                errors?.views?.[viewIndex]?.variant?.[i]?.name?.message,
            }}
            GroupFieldProps={{
              ...register(`views.${viewIndex}.variant.${i}.group`),
              error: !!errors?.views?.[viewIndex]?.variant?.[i]?.group,
              helperText:
                errors?.views?.[viewIndex]?.variant?.[i]?.group?.message,
            }}
          />
        ))}
      </StackM>
    </StackM>
  );
}
