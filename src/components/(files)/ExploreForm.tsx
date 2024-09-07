"use client";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { UseFormRegister, FieldArrayWithId } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";
import { uploadProject } from "@/utils/server-actions";

import { useFilesBeforeUnload } from "@/hooks";
import { exploreSchema } from "@/schema/exploreSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { Button, MenuItem, TextField, Portal } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import toast from "react-hot-toast";
import Image from "next/image";
import { BoxM, DividerM, StackM } from "@/components/Motion";
import { createMotionVar } from "../MotionProps";

export default function Form({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof exploreSchema>;
}) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof exploreSchema>>({
    resolver: zodResolver(exploreSchema),
    defaultValues,
  });

  useFilesBeforeUnload(isDirty);

  const { fields } = useFieldArray({
    control,
    name: "imageFields",
  });

  const possibleCameras = fields.map((_, i) => i);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data: z.infer<typeof exploreSchema>) => {
    setIsSubmitting(true);
    toast.loading("Saving project...", { id: "saving" });

    const errors = await uploadProject(data);

    if (!errors) {
      toast.dismiss("saving");
      toast.success("Project saved successfully!");
      return;
    }

    toast.dismiss("saving");
    errors.error.forEach((error) => toast.error(error));
    setIsSubmitting(false);
  };

  return (
    <Stack gap={2}>
      {errors.project?.message && (
        <Typography variant="caption" color="error">
          {errors.project.message}
        </Typography>
      )}

      <BoxM variants={createMotionVar()} layout>
        <TextField
          variant="filled"
          label="Description"
          required
          size="small"
          fullWidth
          multiline
          rows={3}
          {...register("description")}
          helperText={errors.description?.message}
          error={!!errors.description}
        />
      </BoxM>

      <DividerM layout variants={createMotionVar()} />

      <Stack gap={1.5}>
        <StackM gap={1} layout variants={createMotionVar()}>
          <Typography>Images: </Typography>
          {errors.imageFields?.root?.message ||
            (errors.imageFields?.message && (
              <Typography variant="caption" color="error">
                {errors.imageFields?.message ||
                  errors.imageFields?.root?.message}
              </Typography>
            ))}
        </StackM>

        {fields.map((field, i) => (
          <ImageField
            key={field.id}
            index={i}
            cameras={possibleCameras}
            register={register}
            field={field}
            errors={errors}
          />
        ))}
      </Stack>

      <Portal container={() => document.getElementById("form-submit")}>
        <Button
          startIcon={<SaveRoundedIcon />}
          variant="contained"
          disabled={isSubmitting || !isDirty || !defaultValues?.project}
          onClick={handleSubmit(onSubmit)}
          size="large"
          sx={{
            transition: "all 0.2s ease",
            scale: "1.001",
            "&:hover": { scale: "1.02" },
            "&:active": { scale: "1" },
            px: 3,
          }}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </Portal>
    </Stack>
  );
}

type ImageFieldProps = {
  index: number;
  cameras: number[];
  register: UseFormRegister<z.infer<typeof exploreSchema>>;
  field: FieldArrayWithId<z.infer<typeof exploreSchema>>;
  errors: FieldErrors<z.infer<typeof exploreSchema>>;
};

function ImageField({
  index,
  cameras,
  register,
  field,
  errors,
}: ImageFieldProps) {
  return (
    <StackM
      variants={createMotionVar()}
      layout="position"
      sx={{
        gap: 1,
        border: "2px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 1,
      }}
    >
      <TextField
        variant="filled"
        label="File Name"
        size="small"
        fullWidth
        disabled
        defaultValue={field.name}
        error={!!errors.imageFields?.[index]?.root}
      />

      <Box
        sx={{
          position: "relative",
          aspectRatio: 16 / 9,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{ width: 1, height: 1 }}
        />
        <Image
          src={`/api/image/${field.metadataId}/thumbnail`}
          alt={field.name}
          fill
          unoptimized
        />
      </Box>

      <Stack sx={{ flexDirection: "row", gap: 1 }}>
        <TextField
          variant="filled"
          label="Cam Tag"
          required
          select
          size="small"
          fullWidth
          defaultValue={field.camera}
          {...register(`imageFields.${index}.camera`)}
          helperText={errors.imageFields?.[index]?.camera?.message}
          error={!!errors.imageFields?.[index]?.camera}
          sx={{ flex: 1 }}
        >
          {cameras.map((i) => (
            <MenuItem key={i} value={i}>
              {`cam ${i + 1}`}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          variant="filled"
          label="Type Tag"
          required
          size="small"
          fullWidth
          defaultValue={field.tag}
          {...register(`imageFields.${index}.tag`)}
          helperText={errors.imageFields?.[index]?.tag?.message}
          error={!!errors.imageFields?.[index]?.tag}
          sx={{ flex: 1 }}
        />
      </Stack>
    </StackM>
  );
}
