import type { LinkProps } from "next/link";
import { NextLinkComposed } from "@/components/Link";

import { Box, ButtonBase, Paper } from "@mui/material";
import type { PaperProps } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

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
  sx?: PaperProps["sx"];
  href: LinkProps["href"];
  disabled?: boolean;
}) {
  return (
    <Paper sx={{ overflow: "hidden", ...sx }} elevation={3}>
      <ButtonBase
        component={NextLinkComposed}
        to={href}
        disabled={disabled}
        sx={{ display: "block", height: 1 }}
      >
        <Stack direction="row" height={1}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ height: 1, background: "#e783ad" }} />
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
