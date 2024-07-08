import type { IconButtonProps } from "@mui/material";
import { IconButton, Typography } from "@mui/material";

import { StackM } from "@/components/Motion";
import { bookSpineCollapsedItemVar } from "@/components/MotionProps";

const iconButtonSx: IconButtonProps["sx"] = {
  outline: "1px solid gray",
  "&:hover": { outline: "1px solid #fff" },
  "& + .MuiTypography-root": { scale: "0.85", mt: 0.5 },
  transition: "all 0.2s",
};

export default function NavIconButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: React.MouseEventHandler;
}) {
  return (
    <StackM variants={bookSpineCollapsedItemVar} alignItems="center">
      <IconButton size="small" sx={iconButtonSx} onClick={onClick}>
        {icon}
      </IconButton>
      <Typography>{label}</Typography>
    </StackM>
  );
}
