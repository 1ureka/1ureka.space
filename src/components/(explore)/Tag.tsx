import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";

import Link from "next/link";
import { Chip } from "@mui/material";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

const iconMap: { [key: string]: React.JSX.Element } = {
  camera: <PhotoCameraRoundedIcon fontSize="small" />,
  morning: <WbTwilightRoundedIcon fontSize="small" />,
  day: <LightModeRoundedIcon fontSize="small" />,
  night: <DarkModeRoundedIcon fontSize="small" />,
  defaultTag: <TagRoundedIcon fontSize="small" />,
};

type TagProps = {
  active?: boolean;
  label: string;
  disabled?: boolean;
  href: string;
};

function Tag({ active, label, disabled, href }: TagProps) {
  const baseSx = {
    transition: "all 0.15s ease",
    scale: "0.9",
    "&:hover": { scale: "0.95" },
    "&:active": { scale: "0.9" },
  };

  const activeSx = {
    scale: "1",
    color: "#fff",
    pointerEvents: "none",
  };

  const icon = Object.keys(iconMap).includes(label)
    ? iconMap[label]
    : label.startsWith("cam")
    ? iconMap.camera
    : iconMap.defaultTag;

  return (
    <BoxM variants={createMotionVar()} layout>
      <Chip
        label={label}
        clickable
        color={active ? "primary" : "default"}
        sx={!active ? baseSx : { ...baseSx, ...activeSx }}
        icon={active ? icon : undefined}
        component={Link}
        href={href}
        disabled={disabled}
      />
    </BoxM>
  );
}

export default Tag;
