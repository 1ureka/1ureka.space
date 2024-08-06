"use client";

import type { ImageMetadata } from "@/data/type";

import { PointSection, VariantSection, ViewSection, Point } from "..";
import { BoxM, DividerM, StackM } from "@/components/Motion";
import { opacityVar, yScaleVar, yVar } from "@/components/MotionProps";

import { Skeleton } from "@mui/material";
import { Box, Typography, Fab, TextField } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

function TextSection() {
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
        />
      </BoxM>
    </>
  );
}

export default function ExploreForm({
  metadataList,
}: {
  metadataList: ImageMetadata[];
}) {
  return (
    <Box
      component="form"
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "minmax(325px, 0.5fr) 1fr",
        gap: 4.5,
      }}
    >
      <StackM variants={yScaleVar} gap={1.5}>
        <TextSection />

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
          <ViewSection />
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
