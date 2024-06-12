import type { LinkProps } from "next/link";
import { NextLinkComposed } from "@/components/Link";

import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import type { CardActionAreaProps } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

const cardActionAreaSx: CardActionAreaProps["sx"] = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  height: 1,
};

export default function NavCard({
  label,
  caption,
  href,
  disabled = false,
}: {
  label: string;
  caption: string;
  href: LinkProps["href"];
  disabled?: boolean;
}) {
  return (
    <Card elevation={3}>
      <CardActionArea
        component={NextLinkComposed}
        to={href}
        sx={cardActionAreaSx}
        disabled={disabled}
      >
        <CardMedia sx={{ height: 130 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <rect width="100%" height="100%" fill="#e783ad" />
          </svg>
        </CardMedia>

        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h5">
              {label}
            </Typography>
            {disabled ? "" : <ArrowOutwardRoundedIcon color="primary" />}
          </Stack>

          <Typography variant="caption">{caption}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
