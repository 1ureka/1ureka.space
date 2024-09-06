"use client";

import { useFieldArray, useForm } from "react-hook-form";
import type { UseFormRegister, FieldArrayWithId } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";

import { useFilesBeforeUnload } from "@/hooks";
import { exploreSchema } from "@/schema/exploreSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Divider, Portal, Skeleton, Stack, Typography } from "@mui/material";
import { Button, ButtonBase, MenuItem, TextField } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import Image from "next/image";

export default function Form({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof exploreSchema>;
}) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting, isDirty },
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

  return (
    <Stack gap={2}>
      {errors.project?.message && (
        <Typography variant="caption" color="error">
          {errors.project.message}
        </Typography>
      )}

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

      <Divider />

      <Stack gap={1.5}>
        <Typography>Images: </Typography>
        {errors.imageFields?.root?.message ||
          (errors.imageFields?.message && (
            <Typography variant="caption" color="error">
              {errors.imageFields?.message || errors.imageFields?.root?.message}
            </Typography>
          ))}

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
          disabled={isSubmitting || !isDirty}
          onClick={handleSubmit((data) => console.log(data))}
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
  active?: boolean;
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
    <Stack
      sx={{
        gap: 1,
        border: "2px solid",
        borderColor: index === 0 ? "primary.main" : "divider",
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

      <ButtonBase
        sx={{
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
      </ButtonBase>

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
    </Stack>
  );
}
