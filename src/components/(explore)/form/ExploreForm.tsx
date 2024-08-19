"use client";

import { useRef, useState } from "react";
import type { ImageMetadata } from "@/data/type";

import Block from "@/components/Block";
import { TextField, ViewSection } from "..";
import { PointSection, VariantSection } from "..";
import { Skeleton, Box, Fab, Typography, Stack } from "@mui/material";
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
  const imageContainerRef = useRef<HTMLDivElement>(null);
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => console.log(data))}
      sx={{
        position: "relative",
        height: 1,
        display: "grid",
        gridTemplateColumns: "minmax(325px, 0.5fr) 1fr",
        gap: 4.5,
      }}
    >
      <Stack gap={3}>
        <Block decoration="left" layout>
          <Stack gap={1.5}>
            {rootError && (
              <Typography variant="caption" color="error">
                {rootError.message}
              </Typography>
            )}

            <TextField register={register} errors={errors} />

            <ViewSection
              selected={selectedView}
              onSelect={setSelectedView}
              fields={views}
              errors={errors}
              register={register}
              remove={removeView}
              append={appendView}
            />
          </Stack>
        </Block>

        <Block
          decoration="left"
          sx={{ flexGrow: 1 }}
          layout
          SlotProps={{
            childContainer: {
              sx: {
                display: "grid",
                gridTemplateRows: "minmax(100px, auto) minmax(100px, auto)",
                placeItems: "start stretch",
                gap: 3,
              },
            },
          }}
        >
          {views.map(({ id }, i) => (
            <VariantSection
              key={id}
              metadataList={metadataList}
              viewIndex={i}
              isCurrentView={i === selectedView}
              errors={errors}
              register={register}
              control={control}
            />
          ))}

          {views.map(({ id }, i) => (
            <PointSection
              key={id}
              imageContainerRef={imageContainerRef}
              viewFields={views}
              viewIndex={i}
              isCurrentView={i === selectedView}
              errors={errors}
              control={control}
            />
          ))}
        </Block>
      </Stack>

      <Box>
        <Block
          color="primary.light"
          variant="contained"
          decoration="right"
          layout
          sx={{
            position: "sticky",
            top: 0,
            width: 1,
            height: "auto",
            aspectRatio: 16 / 9,
          }}
          SlotProps={{
            childContainer: { sx: { p: 0 } },
          }}
        >
          <Box ref={imageContainerRef} sx={{ height: 1 }}>
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ width: 1, height: 1, bgcolor: "content.layer3" }}
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
                "&:hover": { bgcolor: "primary.light", scale: "1.1" },
                "&:active": { scale: "0.95" },
                transition: "all 0.25s ease",
              }}
            >
              <SaveRoundedIcon /> Save
            </Fab>
          </Box>
        </Block>
      </Box>
    </Box>
  );
}
