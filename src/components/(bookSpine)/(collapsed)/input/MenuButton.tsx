import type { IconButtonProps, Theme } from "@mui/material";
import type {} from "@mui/material/themeCssVarsAugmentation";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { BoxM, IconButtonM } from "@/components/Motion";

const menuButtonVariants = {
  tap: {
    scale: 0.9,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  hover: {
    outlineOffset: "3.5px",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const menuButtonSx: IconButtonProps["sx"] = {
  outline: "1px solid gray",
  "&:hover": {
    outline: "solid 1px #fff",
    backgroundColor: "#fff",
    color: (theme: Theme) => theme.vars.palette.background.paper,
  },
};

export default function MenuButton({
  open,
  onClick,
}: {
  open: Boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <BoxM>
      <IconButtonM
        size="small"
        sx={menuButtonSx}
        onClick={onClick}
        variants={menuButtonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {open ? (
          <CloseRoundedIcon fontSize="medium" />
        ) : (
          <MenuRoundedIcon fontSize="medium" />
        )}
      </IconButtonM>
    </BoxM>
  );
}
