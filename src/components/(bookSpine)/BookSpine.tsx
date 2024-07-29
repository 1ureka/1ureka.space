"use client";
import { useState } from "react";
import { Backdrop, Box, useMediaQuery } from "@mui/material";
import type { Theme, BoxProps } from "@mui/material";
import { Expanded, Setting } from ".";

import dynamic from "next/dynamic";
const Collapsed = dynamic(() => import("./block/Collapsed"), { ssr: false });

export default function BookSpine({
  UserButton,
  ...props
}: BoxProps & { UserButton: React.ReactNode }) {
  const [open, setOpen] = useState({ menu: false, setting: false });

  const handleToggle = (section: "menu" | "setting") => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const sx: BoxProps["sx"] = isMobile
    ? { position: "absolute", inset: "auto 0 0 0" }
    : { position: "relative", height: 1 };

  return (
    <Box data-mui-color-scheme="dark" sx={sx} zIndex="drawer" {...props}>
      <Backdrop
        sx={{ backdropFilter: "blur(5px)", zIndex: -1 }}
        open={open.menu}
        onClick={() => handleToggle("menu")}
      />

      <Collapsed open={open} onToggle={handleToggle} />
      <Setting open={open.setting} UserButton={UserButton} />
      <Expanded open={open.menu} />
    </Box>
  );
}
