"use cleint";

import { ViewField } from "..";
import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

import { Button, Box, Stack, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

import { z } from "zod";
import type { FieldArrayWithId, FieldErrors } from "react-hook-form";
import type { UseFieldArrayAppend } from "react-hook-form";
import type { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { ExploreSchema } from "@/schema/exploreSchema";

type Z = z.infer<typeof ExploreSchema>;

export default function ViewSection({
  selected,
  onSelect,
  fields,
  errors,
  register,
  remove,
  append,
}: {
  selected: number;
  onSelect: (index: number) => void;
  fields: FieldArrayWithId<Z, "views", "id">[];
  errors: FieldErrors<Z>;
  register: UseFormRegister<Z>;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<Z, "views">;
}) {
  return (
    <StackM variants={yScaleVar}>
      <Box>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="subtitle1">Views: </Typography>
          <Button
            startIcon={<AddBoxRoundedIcon />}
            size="small"
            onClick={() =>
              append({
                name: "",
                points: [],
                variant: [],
              })
            }
          >
            <Typography variant="body1" color="inherit">
              Add
            </Typography>
          </Button>
        </Stack>

        <Typography variant="caption" color="error.main">
          {errors?.views?.message || errors?.views?.root?.message}
        </Typography>
      </Box>

      <Stack gap={1}>
        {fields.map((field, i) => (
          <ViewField
            key={field.id}
            checked={i === selected}
            onSelect={() => onSelect(i)}
            onDelete={() => remove(i)}
            TextFieldProps={{
              ...register(`views.${i}.name`),
              error: !!errors?.views?.[i]?.name,
              helperText: errors?.views?.[i]?.name?.message,
            }}
          />
        ))}
      </Stack>
    </StackM>
  );
}
