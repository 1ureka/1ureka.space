"use client";

import { useEffect } from "react";
import { Stack, Typography } from "@mui/material";

import { PointField } from "..";
import { BoxM, StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import type { FieldArrayWithId } from "react-hook-form";
import { ExploreSchema } from "@/schema/exploreSchema";

type Z = z.infer<typeof ExploreSchema>;

export default function PointSection({
  viewFields,
  viewIndex,
  isCurrentView,
  errors,
  control,
}: {
  viewFields: FieldArrayWithId<Z, "views">[];
  viewIndex: number;
  isCurrentView: boolean;
  errors: FieldErrors<Z>;
  control: Control<Z>;
}) {
  const { fields, replace } = useFieldArray({
    control,
    name: `views.${viewIndex}.points`,
  });

  const pointsRequired = viewFields.length - 1;

  useEffect(() => {
    const points: Z["views"][number]["points"] = viewFields
      .filter((_, i) => i !== viewIndex)
      .map((_, i) => ({ x: -1, y: -1, toView: i < viewIndex ? i : i + 1 }));

    replace(points);
  }, [viewFields, viewIndex, replace]);

  const errorMessage =
    errors?.views?.[viewIndex]?.message ||
    errors?.views?.[viewIndex]?.root?.message ||
    errors?.views?.[viewIndex]?.points?.message ||
    errors?.views?.[viewIndex]?.points?.root?.message;

  if (!isCurrentView) return null;

  return (
    <StackM variants={yScaleVar}>
      <BoxM layout="preserve-aspect">
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="subtitle1">Points: </Typography>
          <Typography variant="caption">{`( 0 / ${pointsRequired} )`}</Typography>
        </Stack>

        <Typography variant="caption" color="error.main">
          {errorMessage}
        </Typography>
      </BoxM>

      <Stack gap={1}>
        {fields.map((field) => (
          <PointField
            key={field.id}
            from={`View ${viewIndex}`}
            to={`View ${field.toView}`}
            type={field.x === -1 ? "add" : "edit"}
          />
        ))}
      </Stack>
    </StackM>
  );
}
