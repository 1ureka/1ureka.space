import "server-only";

import { ButtonBase, Typography } from "@mui/material";
import { Box, Stack } from "@mui/material";
import type { TypographyProps as TP } from "@mui/material";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

import { BoxM, StackM, TypographyM } from "@/components/Motion";
import Block from "@/components/Block";
import Link from "next/link";

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
  sx?: React.CSSProperties;
};

const hex: Record<CardProps["color"], string> = {
  primary: "#e783ad",
  secondary: "#83e7bd",
};

function createPRNG(seed: number) {
  let x = seed;

  // 線性同餘生成器 (Linear Congruential Generator, LCG) 是一個簡單的 PRNG 實現
  function next() {
    x = (x * 1664525 + 1013904223) % 4294967296;
    return x / 4294967296; // 將結果縮放到 [0, 1) 之間
  }

  return next;
}

function createHoverTypo(variant: TP["variant"], text: string, color: string) {
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

export default function Card({
  variant,
  color,
  href,
  decoration = "both",
  media,
  icon,
  title,
  subTitle,
  description,
  sx,
}: CardProps) {
  return (
    <Link href={href} style={sx}>
      <Block
        variant={variant}
        color={`${color}.main`}
        decoration={decoration}
        sx={{
          width: 1,
          height: 1,

          "& > *": {
            transition: "all 0.25s ease",
          },
          "&:hover > *": {
            scale: "1.02",
          },
          "& > div:first-child": {
            outline: `0px solid ${hex[color]}00`,
          },
          "&:hover > div:first-child": {
            outline: `7.5px solid ${hex[color]}35`,
          },
          "& .card-media > *": {
            transition: "scale 0.25s ease",
            scale: "1.001",
          },
          "&:hover .card-media > *": {
            scale: "1.1",
          },
        }}
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
          sx={{
            position: "relative",
            height: 1,
            minHeight: 200,
            display: "grid",
            alignItems: "end",
          }}
        >
          <Stack gap={1}>
            <Stack direction="row" alignItems="flex-end" gap={1}>
              {icon}
              {createHoverTypo(
                "h4",
                `${title} `,
                variant === "outlined" ? `${color}.main` : "text.primary"
              )}
              {createHoverTypo("subtitle2", `${subTitle} `, "text.secondary")}
            </Stack>

            <Typography variant="body2" sx={{ textAlign: "start" }}>
              {description}
            </Typography>

            <StackM
              direction="row"
              gap={1}
              alignItems="center"
              sx={{ opacity: 0, height: 0 }}
              variants={{
                hover: { opacity: 1, height: "auto" },
              }}
            >
              <Typography variant="body2">LEARN MORE</Typography>
              <ArrowCircleRightRoundedIcon />
            </StackM>
          </Stack>
        </Box>

        <ButtonBase
          sx={{ position: "absolute", inset: "-3px", borderRadius: 2 }}
        />
      </Block>
    </Link>
  );
}
