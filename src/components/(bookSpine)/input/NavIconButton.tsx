import type { IconButtonProps, Theme } from "@mui/material";
import { IconButton, Typography, useMediaQuery } from "@mui/material";

import { StackM } from "@/components/Motion";
import { createCollapsedItemVar } from "@/components/MotionProps";

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
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const variants = isMobile
    ? createCollapsedItemVar("y")
    : createCollapsedItemVar("x");

  return (
    <StackM variants={variants} alignItems="center">
      <IconButton size="small" sx={iconButtonSx} onClick={onClick}>
        {icon}
      </IconButton>
      <Typography>{label}</Typography>
    </StackM>
  );
}
