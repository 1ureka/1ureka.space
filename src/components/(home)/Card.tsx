import "server-only";

import { Link } from "next-view-transitions";
import { Box, Stack, ButtonBase, Typography } from "@mui/material";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

import { createPRNG } from "@/utils/utils";
import { BoxM, StackM, TypographyM } from "@/components/Motion";
import Block from "@/components/Block";

type CardProps = {
  variant: "contained" | "outlined";
  color: "primary" | "secondary";
  href: string;
  decoration?: React.ComponentProps<typeof Block>["decoration"];
  media?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  subTitle?: string;
  description?: string;
  sx?: React.ComponentProps<typeof Block>["sx"];
};

const colorMap: Record<CardProps["color"], { main: string; hover: string }> = {
  primary: { main: "#e783ad", hover: "#e783ad" },
  secondary: { main: "#71C8A4", hover: "#83e7bd" },
};

const hoverSx = (
  color: CardProps["color"]
): React.ComponentProps<typeof Box>["sx"] => ({
  // self
  "& > *": {
    transition: "all 0.25s ease",
  },
  "&:hover > *": {
    scale: "1.02",
  },
  // shadow
  "& > div:first-child": {
    outline: `0px solid ${colorMap[color].hover}00`,
  },
  "&:hover > div:first-child": {
    outline: `7.5px solid ${colorMap[color].hover}35`,
  },
  // media
  "& .card-media > *": {
    transition: "scale 0.25s ease",
    scale: "1.001",
  },
  "&:hover .card-media > *": {
    scale: "1.1",
  },
});

export default function Card(props: CardProps) {
  const { variant, color, href, decoration = "both", sx, ...rest } = props;
  const { media, icon, title, subTitle, description } = rest;

  const containerSx = {
    width: 1,
    height: 1,
    ...hoverSx(color),
    ...sx,
  } as React.ComponentProps<typeof Block>["sx"];

  return (
    <Block
      variant={variant}
      color={colorMap[color].main}
      decoration={decoration}
      sx={containerSx}
      SlotProps={{
        childContainer: {
          whileHover: "hover",
          ...(variant === "contained" && {
            "data-mui-color-scheme": "dark",
            color: "text.primary",
          }),
        },
      }}
    >
      {media && (
        <Box
          className="card-media"
          sx={{ position: "absolute", inset: 0, overflow: "hidden" }}
        >
          {media}
        </Box>
      )}

      <Box
        position="relative"
        sx={{ height: 1, minHeight: 200, display: "grid", alignItems: "end" }}
      >
        <Stack gap={1}>
          <Stack direction="row" alignItems="flex-end" gap={1}>
            {icon}

            <HoverTypo
              text={`${title} `}
              variant="h4"
              color={
                variant === "outlined" ? colorMap[color].main : "text.primary"
              }
            />

            <HoverTypo
              text={`${subTitle} `}
              variant="subtitle2"
              color="text.secondary"
            />
          </Stack>

          <Typography variant="body2">{description}</Typography>

          <StackM
            direction="row"
            sx={{ opacity: 0, height: 0, alignItems: "center", gap: 1 }}
            variants={{ hover: { opacity: 1, height: "auto" } }}
          >
            <Typography variant="body2">LEARN MORE</Typography>
            <ArrowCircleRightRoundedIcon />
          </StackM>
        </Stack>
      </Box>

      <ButtonBase
        component={Link}
        href={href}
        sx={{ position: "absolute", inset: "-3px", borderRadius: 2 }}
      />
    </Block>
  );
}

function HoverTypo({
  variant,
  text,
  color,
}: {
  variant: React.ComponentProps<typeof Typography>["variant"];
  text: string;
  color: string;
}) {
  const prng = createPRNG(text.length);

  return (
    <BoxM
      variants={{ hover: { y: -30 } }}
      transition={{ type: "spring", delayChildren: 0.2 }}
    >
      {text.split("").map((l, i) => (
        <TypographyM
          key={i}
          variant={variant}
          sx={{ color, display: "inline-block" }}
          variants={{ hover: { y: 30 } }}
          transition={{ type: "spring", bounce: 0, delay: prng() * 0.5 }}
        >
          {l}
        </TypographyM>
      ))}
    </BoxM>
  );
}
