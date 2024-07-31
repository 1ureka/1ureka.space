import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Box, Stack } from "@mui/material";
import type { CardProps as MuiCardProps } from "@mui/material";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

import { NextLinkComposed } from "@/components/Link";
import type { LinkProps } from "next/link";

import { CardM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

type SX = MuiCardProps["sx"];

type CardProps = Omit<MuiCardProps, "variant"> & {
  variant: "contained" | "outlined";
  color: "primary" | "secondary";
  href: LinkProps["href"];
  media?: React.ReactNode;
};

const hex = { primary: "#e783ad", secondary: "#83e7bd" };

const hoverSx: (color: CardProps["color"]) => SX = (color) => ({
  transition: "outline 0.25s ease",
  outline: `0px solid ${hex[color]}00`,
  "&:hover": {
    outline: `7.5px solid ${hex[color]}35`,
  },

  "& .MuiCardMedia-root": {
    transition: "scale 0.25s ease",
    scale: "1.001",
  },
  "&:hover .MuiCardMedia-root": {
    scale: "1.1",
  },
});

const containedSx: (color: CardProps["color"]) => SX = (color) => ({
  bgcolor: `${color}.main`,
  backgroundImage:
    color === "secondary" ? `linear-gradient(#00000020, #00000020)` : "",
});

const outlinedSx: (color: CardProps["color"]) => SX = (color) => ({
  border: "1px solid",
  borderColor: color === "primary" ? "primary.main" : "secondary.main",
});

export default function Card({
  variant,
  color,
  href,
  sx,
  media,
  children,
}: CardProps) {
  const cardSx: SX = {
    overflow: "hidden",
    ...(variant === "contained" ? containedSx(color) : outlinedSx(color)),
    ...hoverSx(color),
    ...sx,
  } as SX;

  return (
    <CardM
      variants={yScaleVar}
      sx={cardSx}
      data-mui-color-scheme={variant === "contained" && "dark"}
    >
      <CardActionArea component={NextLinkComposed} to={href} sx={{ height: 1 }}>
        <CardMedia sx={{ position: "absolute", inset: 0, m: 0 }}>
          {media}
        </CardMedia>

        <CardContent
          sx={{
            height: 1,
            minHeight: 200,
            display: "grid",
            alignContent: "end",
            zIndex: 1,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            gap={3}
            zIndex={1}
          >
            {children}
            <ArrowIcon variant={variant} color={color} />
          </Stack>
        </CardContent>

        <Box
          sx={{
            position: "absolute",
            inset: "0 0 auto 0",
            display: "grid",
            placeItems: "center",
          }}
        >
          <ArrowDropDownRoundedIcon color="action" fontSize="large" />
        </Box>
      </CardActionArea>
    </CardM>
  );
}

type ArrowIconProps = {
  variant: CardProps["variant"];
  color: CardProps["color"];
};

function ArrowIcon({ variant, color }: ArrowIconProps) {
  const fontSize = "h3.fontSize";
  return variant === "contained" ? (
    <ArrowCircleDownRoundedIcon
      sx={{ fontSize, transform: "rotate(-90deg)", color: "text.primary" }}
    />
  ) : (
    <ArrowCircleRightRoundedIcon
      sx={{
        fontSize,
        color: color === "primary" ? "primary.main" : "secondary.dark",
      }}
    />
  );
}
