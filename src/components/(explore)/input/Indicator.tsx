"use client";

import { useParams } from "next/navigation";
import { NextLinkComposed } from "@/components/Link";

import { Divider, TextField, Typography } from "@mui/material";
import { MenuItem as MuiMenuItem } from "@mui/material";
import type { MenuItemProps } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

const MenuItem = MuiMenuItem as React.FC<
  MenuItemProps & { to: string; prefetch: boolean }
>;

export default function Indicator({ amount }: { amount: number }) {
  const params = useParams() as { index: string };
  const index = Number(params.index);

  return (
    <StackM gap={1} alignItems="center" alignSelf="center" variants={yScaleVar}>
      <TextField
        select
        value={params.index}
        size="small"
        SelectProps={{
          IconComponent: ArrowDropDownRoundedIcon,
          MenuProps: { PaperProps: { style: { maxHeight: 200 } } },
        }}
        sx={{ "& fieldset": { border: "none" }, translate: "-0.7rem" }}
      >
        {Array(amount)
          .fill(0)
          .map((_, i) => (
            <MenuItem
              key={i}
              value={i}
              selected={index === i}
              component={NextLinkComposed}
              to={`/explore/${i}`}
              prefetch={false}
            >
              {String(i + 1).padStart(2, "0")}
            </MenuItem>
          ))}
      </TextField>

      <Divider
        flexItem
        sx={{ minWidth: "3rem", scale: "1.2", transform: "rotate(-45deg)" }}
      />

      <Typography variant="body2" sx={{ translate: "0.7rem" }}>
        10
      </Typography>
    </StackM>
  );
}
