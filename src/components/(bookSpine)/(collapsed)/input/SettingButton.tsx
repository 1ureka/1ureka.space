import type { Theme } from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { BoxM, IconButtonM } from "@/components/Motion";
import { bookSpineCollapsedItemVar } from "@/components/Motion";

const settingButtonVariants = {
  open: {
    outlineOffset: "3.5px",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  close: {
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function SettingButton({
  open,
  onClick,
}: {
  open: Boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const backgroundColor = open ? "#fff" : null;
  const sx = {
    backgroundColor,
    outline: "1px solid gray",
    "&:hover": { outline: "1px solid #fff", backgroundColor },
    color: (theme: Theme) =>
      open ? theme.vars.palette.background.paper : null,
  };

  return (
    <BoxM variants={bookSpineCollapsedItemVar}>
      <IconButtonM
        variants={settingButtonVariants}
        animate={open ? "open" : "close"}
        onClick={onClick}
        sx={sx}
      >
        <SettingsRoundedIcon sx={{ fontSize: "20px" }} />
      </IconButtonM>
    </BoxM>
  );
}
