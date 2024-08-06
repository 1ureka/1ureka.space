"use client";

import { Typography, TextField } from "@mui/material";
import { BoxM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

import { z } from "zod";
import { ExploreSchema } from "@/schema/exploreSchema";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

export default function TextSection({
  register,
  errors,
}: {
  register: UseFormRegister<z.infer<typeof ExploreSchema>>;
  errors: FieldErrors<z.infer<typeof ExploreSchema>>;
}) {
  return (
    <>
      <BoxM variants={yScaleVar}>
        <TextField
          label="Explore name"
          variant="filled"
          type="text"
          size="small"
          fullWidth
          placeholder={`Sky city from "The Fifth Element"`}
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </BoxM>

      <BoxM variants={yScaleVar}>
        <Typography variant="subtitle1">Description: </Typography>
        <TextField
          variant="filled"
          size="small"
          fullWidth
          multiline
          minRows={4}
          maxRows={4}
          placeholder="Start with a new View. Each View needs at least one Variant and Points equal to the View count minus one within the Explore."
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </BoxM>
    </>
  );
}
