import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { absolute: "1ureka's space" },
};

import { Stack, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import MapRoundedIcon from "@mui/icons-material/MapRounded";

import { BoxM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";

import AuthToastLogic from "@/components/(auth)/AuthToast";
import { Card, CardMedia1, CardMedia2 } from "@/components/(home)";
import { CardMedia3, CardMedia4, CardMedia5 } from "@/components/(home)";

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

const containerSx: BoxProps["sx"] = {
  pt: 5,
  pb: 7,
  px: { xs: 3, sm: 6.5, md: 8.5 },
  display: "grid",
  gridTemplateAreas,
  gridTemplateColumns,
  gap: { xs: 1.5, md: 3, lg: 5 },
};

const staggerHoverSx = () => {
  return [1, 2, 3]
    .map((i) => ({
      [`& .ax05-circle:nth-child(${i})`]: {
        transform: `rotate(${i * 120}deg)`,
      },
      [`& .ax05-circle:nth-child(${i}) :first-child`]: {
        fillOpacity: 0.6,
        transition: `all 1s cubic-bezier(0.22, 0.61, 0.36, 1) ${(i - 1) / 10}s`,
      },
      [`& .ax05-circle:nth-child(${i}) :last-child`]: {
        strokeOpacity: 0.6,
        strokeDasharray: "30",
        strokeDashoffset: "120",
        scale: "1",
        transformOrigin: "center",
        transition: `all 1s cubic-bezier(0.22, 0.61, 0.36, 1) ${(i - 1) / 10}s`,
      },
      [`&:hover .ax05-circle:nth-child(${i}) :first-child`]: {
        fillOpacity: 1,
      },
      [`&:hover .ax05-circle:nth-child(${i}) :last-child`]: {
        strokeDashoffset: "0",
        scale: "1.2",
      },
    }))
    .reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {} as Record<string, unknown>
    );
};

export default function Content() {
  return (
    <BoxM sx={containerSx} {...layoutChildMotionProps()}>
      <Card
        variant="contained"
        color="primary"
        sx={{ gridArea: "main", ...staggerHoverSx() }}
        href="/explore/view/0"
        hrefTitle="Explore"
        media={<CardMedia5 />}
      >
        <Stack gap={1}>
          <Stack direction="row" alignItems="flex-end" gap={1}>
            <MapRoundedIcon
              sx={{ fontSize: "h3.fontSize", color: "text.primary" }}
            />
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              Explore{" "}
            </Typography>
            <Typography variant="subtitle2" sx={{ alignSelf: "flex-end" }}>
              BOOKS{" "}
            </Typography>
          </Stack>
          <Typography variant="body2">
            Investigating the dynamic visual changes within a 3D scene across
            various viewpoints, spanning different times, weather patterns, and
            seasonal shifts.
          </Typography>
        </Stack>
      </Card>

      <Card
        variant="outlined"
        color="primary"
        sx={{
          gridArea: "book1",
          "& rect": {
            transition: "all 1s cubic-bezier(0.22, 0.61, 0.36, 1)",
            stroke: "var(--mui-palette-primary-main)",
            fill: "var(--mui-palette-primary-main)",
            fillOpacity: 0.2,
            strokeDasharray: "300",
            strokeDashoffset: "600",
          },
          "&:hover rect": {
            strokeDashoffset: "0",
            fillOpacity: 0.5,
          },
        }}
        href="/scene"
        hrefTitle="Scene"
        media={<CardMedia1 />}
      >
        <Stack gap={1}>
          <Stack direction="row" alignItems="flex-end" gap={1}>
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              Scene{" "}
            </Typography>
            <Typography variant="subtitle2">BOOKS </Typography>
          </Stack>
          <Typography variant="body2">
            Anime and game scenes reimagined in realistic detail.
          </Typography>
        </Stack>
      </Card>

      <Card
        variant="outlined"
        color="primary"
        sx={{
          gridArea: "book2",
          "& .MuiCardMedia-root svg > path": {
            transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
            stroke: "var(--mui-palette-primary-main)",
            fill: "var(--mui-palette-primary-main)",
            fillOpacity: 0.2,
            strokeDasharray: "0 1000",
            strokeWidth: 5,
          },
          "&:hover .MuiCardMedia-root svg > path": {
            strokeDasharray: "1000 0",
            fillOpacity: 0.5,
          },
        }}
        href="/props"
        hrefTitle="Props"
        media={<CardMedia2 />}
      >
        <Stack gap={1}>
          <Stack direction="row" alignItems="flex-end" gap={1}>
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              Props{" "}
            </Typography>
            <Typography variant="subtitle2">BOOKS </Typography>
          </Stack>
          <Typography variant="body2">
            A collection of 3D models for scenes, from tiny screws to entire
            buildings.
          </Typography>
        </Stack>
      </Card>

      <Card
        variant="contained"
        color="secondary"
        sx={{
          gridArea: "tool1",
          "& .icon": {
            stroke: "white",
            strokeOpacity: 0.4,
            strokeDasharray: "150",
            strokeDashoffset: "300",
            transition: "all 1s",
            fill: "white",
            fillOpacity: 0.1,
          },
          "&:hover .icon": {
            strokeDashoffset: "0",
            fillOpacity: 0,
          },
          "& .text": {
            stroke: "white",
            strokeOpacity: 0,
            strokeDasharray: "100",
            transition: "all 1s",
            fill: "white",
            fillOpacity: 0.4,
          },
          "&:hover .text": {
            strokeDasharray: "1000",
            strokeOpacity: 0.4,
            fillOpacity: 0.1,
          },
        }}
        href="/files/images"
        hrefTitle="File Shelf"
        media={<CardMedia3 />}
      >
        <Stack gap={1}>
          <Stack direction="row" alignItems="flex-end" gap={1}>
            <Typography variant="h5" sx={{ color: "text.primary" }}>
              File Shelf{" "}
            </Typography>
            <Typography variant="subtitle2">TOOLS </Typography>
          </Stack>
          <Typography variant="body2">
            Seamlessly manage image collection with real-time backend syncing.
          </Typography>
        </Stack>
      </Card>

      <Card
        variant="outlined"
        color="secondary"
        sx={{
          gridArea: "tool2",
          "& .MuiCardMedia-root svg > path": {
            stroke: "var(--mui-palette-secondary-main)",
            fill: "var(--mui-palette-secondary-main)",
            strokeLinecap: "round",
            strokeDasharray: "1000 0",
            fillOpacity: 0.1,
            transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          "&:hover .MuiCardMedia-root svg > path": {
            strokeDasharray: "0 1000",
            fillOpacity: 0.75,
          },
        }}
        href="/editor"
        hrefTitle="Image Editor"
        media={<CardMedia4 />}
      >
        <Stack gap={1}>
          <Stack direction="row" alignItems="flex-end" gap={1}>
            <Typography variant="h5" sx={{ color: "secondary.dark" }}>
              Image Editor{" "}
            </Typography>
            <Typography variant="subtitle2">TOOLS </Typography>
          </Stack>
          <Typography variant="body2">
            Transform photos with conversion, compression, and filters.
          </Typography>
        </Stack>
      </Card>

      <AuthToastLogic />
    </BoxM>
  );
}
