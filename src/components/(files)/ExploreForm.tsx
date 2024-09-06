"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ButtonBase,
  Divider,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import type { UseFormRegister, FieldArrayWithId } from "react-hook-form";
import { z } from "zod";

const exploreSchema = z.object({
  project: z.string().min(1, "Please select a group first"),
  description: z.string().min(1, "Please enter a description"),
  imageFields: z.array(
    z.object({
      id: z.string().min(1, "Image ID is invalid"),
      name: z.string().min(1, "Please select an image"),
      camera: z
        .number()
        .int("Camera index must be integer")
        .gte(0, "Camera index must be greater than or equal to 0"),
      tag: z.string().min(1, "Please enter a tag for the image"),
    })
  ),
});

export default function Form({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof exploreSchema>;
}) {
  const {
    register,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<z.infer<typeof exploreSchema>>({
    resolver: zodResolver(exploreSchema),
    defaultValues,
  });

  const { fields } = useFieldArray({
    control,
    name: "imageFields",
  });

  const possibleCameras = fields.map((_, i) => i);

  return (
    <Stack gap={2}>
      <TextField
        variant="filled"
        label="Description"
        required
        size="small"
        fullWidth
        multiline
        rows={3}
        {...register("description")}
      />

      <Divider />

      <Stack gap={1.5}>
        <Typography>Images: </Typography>

        {fields.map((field, i) => (
          <ImageField
            key={field.id}
            index={i}
            cameras={possibleCameras}
            register={register}
            field={field}
          />
        ))}
      </Stack>
    </Stack>
  );
}

type ImageFieldProps = {
  index: number;
  cameras: number[];
  active?: boolean;
  register: UseFormRegister<z.infer<typeof exploreSchema>>;
  field: FieldArrayWithId<z.infer<typeof exploreSchema>>;
};

function ImageField({ index, cameras, register, field }: ImageFieldProps) {
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
          sx={{ flex: 1 }}
        />
      </Stack>
    </Stack>
  );
}
