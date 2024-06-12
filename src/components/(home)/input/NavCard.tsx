import type { LinkProps } from "next/link";
import { NextLinkComposed } from "@/components/Link";

import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import type { CardActionAreaProps, CardProps } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const cardActionAreaSx: CardActionAreaProps["sx"] = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  height: 1,
};

export default function NavCard({
  title,
  subTitle,
  caption,
  sx,
  href,
  disabled = false,
}: {
  title: string;
  subTitle: string;
  caption: string;
  sx?: CardProps["sx"];
  href: LinkProps["href"];
  disabled?: boolean;
}) {
  return (
    <Card sx={{ minHeight: 250, ...sx }} elevation={3}>
      <CardActionArea
        component={NextLinkComposed}
        to={href}
        sx={cardActionAreaSx}
        disabled={disabled}
      >
        <CardMedia sx={{ flexGrow: 1, background: "#e783ad" }} />

        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="baseline" gap={1.5}>
              <Typography gutterBottom variant="h5">
                {title}
              </Typography>
              <Typography variant="subtitle2">{subTitle}</Typography>
            </Stack>

            {disabled ? (
              <LockRoundedIcon color="primary" />
            ) : (
              <ArrowOutwardRoundedIcon color="primary" />
            )}
          </Stack>

          <Typography variant="caption">{caption}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
