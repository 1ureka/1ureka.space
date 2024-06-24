import React from "react";
import type { LinkProps } from "next/link";
import { NextLinkComposed } from "@/components/Link";

import { Box, Stack, Typography } from "@mui/material";
import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import type { CardProps } from "@mui/material";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

interface NavCardProps {
  media: React.ReactNode;
  title: string;
  subTitle: string;
  caption: string;
  sx?: CardProps["sx"];
  href: LinkProps["href"];
  disabled?: boolean;
}

export default function CardBlog({
  media,
  title,
  subTitle,
  caption,
  href,
  disabled = false,
}: NavCardProps) {
  return (
    <Card
      sx={{ m: "auto", maxWidth: 700, borderRadius: 2, overflow: "initial" }}
      elevation={3}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          py: 2,
          "&:hover img": {
            scale: "1.1",
          },
          "& img": {
            scale: "1.01",
            transition: "scale 0.25s ease",
          },
          "& :has(> img)": {
            transition: "outline 0.25s ease",
            outline: "0px solid #e783ad00",
          },
          "&:hover :has(> img)": {
            outline: "7.5px solid #e783ad30",
          },
        }}
        disabled={disabled}
        component={NextLinkComposed}
        to={href}
      >
        <CardMedia
          sx={{
            position: "relative",
            width: 0.7,
            mt: 0,
            ml: -3,
            height: 0,
            pb: "max(25vh, 35%)",
            borderRadius: 2,
            transform: "translateX(-8px)",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          {media}
        </CardMedia>
        <CardContent sx={{ width: 1 }}>
          <Stack
            direction="row"
            alignItems="baseline"
            flexWrap="wrap"
            gap={1.5}
          >
            <Typography variant="h5" color={disabled ? "text.secondary" : ""}>
              {title}
            </Typography>
            <Typography variant="subtitle2">{subTitle}</Typography>
            <Typography variant="caption">{caption}</Typography>
          </Stack>
          <Box sx={{ pt: 2 }}>
            {disabled ? (
              <LockRoundedIcon sx={{ color: "text.secondary" }} />
            ) : (
              <ArrowOutwardRoundedIcon color="primary" />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
