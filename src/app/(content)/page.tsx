import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { absolute: "1ureka's space" },
};

import { Box, Stack, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

import { delay } from "@/utils/server-utils";
import { summaryCategorySize } from "@/data/table";

import AuthToastLogic from "@/components/(settings)/AuthToast";
import Block from "@/components/Block";
import { Card, CardMedia1, CardMedia2, Chart } from "@/components/(home)";
import { CardMedia3, CardMedia4, CardMedia5 } from "@/components/(home)";
import { BoxM, DividerM, StackM } from "@/components/Motion";
import { createMotionVar, createMotionProps } from "@/components/MotionProps";

const gridTemplateAreas = {
  xs: `"main" "book1" "book2" "tool1" "tool2"`,
  md: `"main main" "book1 book2" "tool1 tool2"`,
  lg: `"main main tool1" "book1 book2 tool2"`,
};

const gridTemplateColumns = {
  xs: "1fr",
  md: "1fr 1fr",
  lg: "1fr 1fr 1fr",
};

const gap = { xs: 1.5, md: 2.5, lg: 3.5, xl: 4.5 };

const containerSx: BoxProps["sx"] = {
  display: "grid",
  gridTemplateAreas,
  gridTemplateColumns,
  gap,
  height: 1,
};

const cardsProps: React.ComponentProps<typeof Card>[] = [
  {
    variant: "contained",
    color: "primary",
    href: "/explore/view/0",
    sx: { gridArea: "main" },
    decoration: "both",
    icon: (
      <AutoStoriesRoundedIcon
        sx={{ fontSize: "h3.fontSize", color: "text.primary" }}
      />
    ),
    media: <CardMedia5 />,
    title: "Explore",
    subTitle: "BOOKS",
    description:
      "Investigating the dynamic visual changes within a 3D scene across various viewpoints, spanning different times, weather patterns, and seasonal shifts.",
  },
  {
    variant: "outlined",
    color: "primary",
    href: "/gallery/scene",
    sx: { gridArea: "book1" },
    decoration: "left",
    media: <CardMedia1 />,
    title: "Scene",
    subTitle: "BOOKS",
    description: "Anime and game scenes reimagined in realistic detail.",
  },
  {
    variant: "outlined",
    color: "primary",
    href: "/gallery/props",
    sx: { gridArea: "book2" },
    decoration: "right",
    media: <CardMedia2 />,
    title: "Props",
    subTitle: "BOOKS",
    description:
      "A collection of 3D models for scenes, from tiny screws to entire buildings.",
  },
  {
    variant: "contained",
    color: "secondary",
    href: "/files/images",
    sx: { gridArea: "tool1" },
    decoration: "right",
    media: <CardMedia3 />,
    title: "File Shelf",
    subTitle: "TOOLS",
    description:
      "Seamlessly manage image collection with real-time backend syncing.",
  },
  {
    variant: "outlined",
    color: "secondary",
    href: "/editor",
    sx: { gridArea: "tool2" },
    decoration: "right",
    media: <CardMedia4 />,
    title: "Image Editor",
    subTitle: "TOOLS",
    description: "Transform photos with conversion, compression, and filters.",
  },
];

export default async function Page() {
  await delay(Math.random() * 2000);

  const { props, scene } = await summaryCategorySize();
  const propsSize = parseFloat((props / 1024 / 1024).toFixed(2));
  const sceneSize = parseFloat((scene / 1024 / 1024).toFixed(2));

  const data = [
    { value: sceneSize, label: "scene", color: "#e783ad" },
    { value: propsSize, label: "props", color: "#e783ad90" },
  ];

  return (
    <StackM gap={gap} height={1} {...createMotionProps()}>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", gap }}>
        <Block decoration="left">
          <Stack
            direction={{ sm: "row" }}
            gap={{ xs: 1, sm: 3 }}
            alignItems={{ sm: "flex-end" }}
            height={1}
          >
            <BoxM variants={createMotionVar()}>
              <Typography variant="h5">{"1ureka's space"}</Typography>
            </BoxM>

            <DividerM
              variants={createMotionVar()}
              orientation="vertical"
              flexItem
            />

            <BoxM variants={createMotionVar({ from: { scale: 1 } })}>
              <Typography>
                My personal website for storing and managing a portfolio of 3D
                CG, with basic image editing capabilities.
              </Typography>
            </BoxM>
          </Stack>
        </Block>

        <Block decoration="right">
          <Chart data={data} />
        </Block>
      </Box>

      <Box sx={containerSx}>
        {cardsProps.map((props) => (
          <Card key={props.href} {...props} />
        ))}

        <AuthToastLogic />
      </Box>
    </StackM>
  );
}
