"use client";

import { useState } from "react";
import type { ImageMetadata } from "@/data/type";

import { TextField, Point } from "..";
import { PointSection, VariantSection, ViewSection } from "..";
import { BoxM, DividerM, StackM } from "@/components/Motion";
import { opacityVar, yScaleVar, yVar } from "@/components/MotionProps";

import { Skeleton, Box, Fab, Typography } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExploreSchema } from "@/schema/exploreSchema";
import { useFieldArray, useForm } from "react-hook-form";

export default function ExploreForm({
  metadataList,
  defaultValues,
}: {
  metadataList: ImageMetadata[];
  defaultValues?: z.infer<typeof ExploreSchema>;
}) {
  const [selectedView, setSelectedView] = useState(0);

  const { register, control, handleSubmit, formState } = useForm<
    z.infer<typeof ExploreSchema>
  >({
    resolver: zodResolver(ExploreSchema),
    defaultValues:
      defaultValues !== undefined
        ? defaultValues
        : {
            name: "",
            description: "",
            views: [{ name: "", points: [], variant: [] }],
          },
  });

  const { errors } = formState;
  const zodErrors = errors as { "": { message: string } };
  const rootError = zodErrors[""];

  const {
    fields: views,
    append: appendView,
    remove: removeView,
  } = useFieldArray({
    control,
    name: "views",
  });

  const {
    fields: variants,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: `views.${selectedView}.variant`,
  });

  const {
    fields: points,
    append: appendPoint,
    remove: removePoint,
  } = useFieldArray({
    control,
    name: `views.${selectedView}.points`,
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => console.log(data))}
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "minmax(325px, 0.5fr) 1fr",
        gap: 4.5,
      }}
    >
      <StackM variants={yScaleVar} gap={1.5}>
        {rootError && (
          <Typography variant="caption" color="error">
            {rootError.message}
          </Typography>
        )}

        <TextField register={register} errors={errors} />

        <Box
          sx={{
            display: "grid",
            gridTemplateRows:
              "minmax(100px, auto) auto minmax(100px, auto) minmax(100px, auto)",
            placeItems: "start stretch",
            flexGrow: 1,
            gap: 3,
          }}
        >
          <ViewSection
            selected={selectedView}
            onSelect={setSelectedView}
            fields={views}
            errors={errors}
            register={register}
            remove={removeView}
            append={appendView}
          />

          <DividerM variants={yVar} sx={{ height: "0px" }} />

          <VariantSection metadataList={metadataList} />
          <PointSection />
        </Box>
      </StackM>

      <BoxM variants={opacityVar}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            width: 1,
            height: "auto",
            aspectRatio: 16 / 9,
          }}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ width: 1, height: 1 }}
          />
          <Fab
            type="submit"
            variant="extended"
            color="primary"
            sx={{
              position: "absolute",
              inset: "auto 0 0 auto",
              translate: "0 50%",
              mr: 2,
              gap: 1,
            }}
          >
            <SaveRoundedIcon /> Save
          </Fab>

          <Point
            color="var(--mui-palette-secondary-dark)"
            name="To View 2"
            sx={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        </Box>
      </BoxM>
    </Box>
  );
}
