"use client";

import { useParams } from "next/navigation";
import { NextLinkComposed } from "@/components/Link";
import { isValidIndex } from "@/utils/utils";

import { Divider, Stack, TextField, Typography } from "@mui/material";
import { MenuItem as MuiMenuItem } from "@mui/material";
import type { MenuItemProps, StackProps } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

const MenuItem = MuiMenuItem as React.FC<
  MenuItemProps & { to: string; prefetch: boolean; scroll: boolean }
>;

export default function Indicator({
  amount,
  sx,
}: {
  amount: number;
  sx?: StackProps["sx"];
}) {
  const params = useParams() as { index: string };
  const index = isValidIndex(params.index, 10);
  if (index === -1) return null;

  return (
    <Stack gap={1} alignItems="center" sx={sx}>
      <TextField
        select
        value={params.index}
        size="small"
        SelectProps={{
          IconComponent: ArrowDropDownRoundedIcon,
          MenuProps: { PaperProps: { style: { maxHeight: 200 } } },
          sx: { "& .MuiSelect-icon": { color: "inherit" }, color: "inherit" },
        }}
        sx={{ "& fieldset": { border: "none" } }}
      >
        {Array(amount)
          .fill(0)
          .map((_, i) => (
            <MenuItem
              key={i}
              value={i}
              selected={index === i}
              component={NextLinkComposed}
              to={`/explore/view/${i}`}
              prefetch={false}
              scroll={false}
            >
              {String(i + 1).padStart(2, "0")}
            </MenuItem>
          ))}
      </TextField>

      <Divider flexItem sx={{ minWidth: "3rem", borderColor: "inherit" }} />

      <Typography variant="body1">10</Typography>
    </Stack>
  );
}
