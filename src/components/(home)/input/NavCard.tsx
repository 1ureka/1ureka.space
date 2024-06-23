import type { LinkProps } from "next/link";
import { NextLinkComposed } from "@/components/Link";

import { Box, ButtonBase, Paper } from "@mui/material";
import type { PaperProps } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

export default function NavCard({
  media,
  title,
  subTitle,
  caption,
  sx,
  href,
  disabled = false,
}: {
  media: React.ReactNode;
  title: string;
  subTitle: string;
  caption: string;
  sx?: PaperProps["sx"];
  href: LinkProps["href"];
  disabled?: boolean;
}) {
  return (
    <Paper
      sx={{
        pointerEvents: disabled ? "none" : null,
        overflow: "hidden",
        transition: "outline 0.25s ease",
        outline: "0px solid #e783ad00",
        "&:hover": {
          outline: "7.5px solid #e783ad30",
        },
        ...sx,
      }}
      elevation={3}
    >
      <ButtonBase
        component={NextLinkComposed}
        to={href}
        disabled={disabled}
        sx={{
          display: "block",
          height: 1,
          "&:hover .media > *": {
            scale: "1.1",
          },
          "& .media > *": {
            scale: "1.01",
            transition: "scale 0.25s ease",
          },
        }}
      >
        <Stack direction="row" height={1}>
          <Box
            className="media"
            sx={{ position: "relative", flexGrow: 1, overflow: "hidden" }}
          >
            {/* <Box sx={{ height: 1, background: "#e783ad" }} /> */}
            {media}
          </Box>

          <Box sx={{ p: 3, width: 0.55 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Stack direction="row" alignItems="baseline" gap={1.5}>
                <Typography
                  gutterBottom
                  variant="h5"
                  color={disabled ? "text.secondary" : ""}
                >
                  {title}
                </Typography>
                <Typography variant="subtitle2">{subTitle}</Typography>
              </Stack>

              {disabled ? (
                <LockRoundedIcon sx={{ color: "text.secondary" }} />
              ) : (
                <ArrowOutwardRoundedIcon color="primary" />
              )}
            </Stack>

            <Typography variant="caption">{caption}</Typography>
          </Box>
        </Stack>
      </ButtonBase>
    </Paper>
  );
}
