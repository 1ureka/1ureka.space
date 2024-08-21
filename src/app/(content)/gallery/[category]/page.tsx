import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "gallery",
};

import { getSortedMetadata } from "@/data/table";
import { notFound } from "next/navigation";

import { Typography } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";

import Block from "@/components/Block";
import { FilterAccordion, Gallery } from "@/components/(books)";
import Carousels from "@/components/(carousels)/Carousels";
import { BoxM, StackM } from "@/components/Motion";
import { createMotionProps, createMotionVar } from "@/components/MotionProps";

const staticText = {
  props: {
    project: "PJ26",
    info: `It includes a variety of models, from small screws to buildings, 
        to meet outdoor scene requirements. It provides pre-packaged objects
        based on instances.`,
  },
  scene: {
    project: "PJ27, PJ28",
    info: `Reimagining classic scenes from anime and games with a realistic
        touch, along with original works inspired by Japan’s countryside.`,
  },
};

const gap = {
  xs: 1.5,
  md: 2.5,
  lg: 3.5,
};

const containerSx: React.ComponentProps<typeof BoxM>["sx"] = {
  position: "relative",
  display: "grid",
  gridTemplateAreas: `"header accordion" "gallery gallery"`,
  gridTemplateRows: "auto 1fr",
  placeItems: "start stretch",
  gap,
};

export default async function Page({ params }: { params: unknown }) {
  if (!params || typeof params !== "object" || !("category" in params)) {
    throw new Error("Invalid params");
  }

  const { category } = params;

  if (category !== "props" && category !== "scene") {
    notFound();
  }

  const { project, info } = staticText[category];
  const metadataList = await getSortedMetadata(category);
  const count = metadataList.length;

  return (
    <BoxM {...createMotionProps()} sx={containerSx}>
      <Block
        variant="contained"
        color="primary.main"
        decoration="left"
        sx={{ gridArea: "header" }}
        SlotProps={{
          childContainer: {
            sx: {
              display: "grid",
              gridTemplateAreas: `"a b c" "d d d"`,
              gridTemplateColumns: "auto auto 1fr",
              gap,
            },
            "data-mui-color-scheme": "dark",
          },
        }}
      >
        <BoxM
          variants={createMotionVar()}
          sx={{ gridArea: "a", alignSelf: "center" }}
        >
          <Typography variant="h5" sx={{ color: "text.primary" }}>
            {category.toUpperCase()}
          </Typography>
        </BoxM>

        <StackM variants={createMotionVar()} sx={{ gap: 0.5, gridArea: "b" }}>
          <Typography variant="caption">PROJECTS:</Typography>
          <Typography variant="caption" sx={{ color: "text.primary" }}>
            {project}
          </Typography>
        </StackM>

        <StackM variants={createMotionVar()} sx={{ gap: 0.5, gridArea: "c" }}>
          <Typography variant="caption">INCLUDES:</Typography>
          <Typography variant="caption" sx={{ color: "text.primary" }}>
            {count} images
          </Typography>
        </StackM>

        <BoxM
          variants={createMotionVar({ from: { scale: 1 } })}
          sx={{ gridArea: "d" }}
        >
          <Typography variant="body2">{info}</Typography>
        </BoxM>
      </Block>

      <Block
        color="primary.main"
        decoration="right"
        sx={{ gridArea: "accordion", height: 1 }}
      >
        <Accordion elevation={0} sx={{ background: "transparent" }}>
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <StackM
              variants={createMotionVar()}
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ color: "text.secondary" }}
            >
              <AutoFixHighRoundedIcon />
              <Typography variant="button">Filter</Typography>
            </StackM>
          </AccordionSummary>

          <AccordionDetails>
            <FilterAccordion />
          </AccordionDetails>
        </Accordion>
      </Block>

      <Block sx={{ gridArea: "gallery" }}>
        <Gallery metadataList={metadataList} />
      </Block>

      <Carousels metadataList={metadataList} />
    </BoxM>
  );
}
