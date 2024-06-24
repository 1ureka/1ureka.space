"use client";
import { useState } from "react";
import { Backdrop, Box, type BoxProps } from "@mui/material";
import { Collapsed, Expanded, Setting } from ".";

export default function BookSpine(props: BoxProps) {
  const [open, setOpen] = useState({ menu: false, setting: false });

  const handleToggle = (section: "menu" | "setting") => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Box
      data-mui-color-scheme="dark"
      sx={{ position: "relative", height: 1, zIndex: "drawer" }}
      {...props}
    >
      <Backdrop
        sx={{ backdropFilter: "blur(5px)", zIndex: -1 }}
        open={open.menu}
        onClick={() => handleToggle("menu")}
      />

      <Collapsed open={open} onToggle={handleToggle} />
      <Setting open={open.setting} />
      <Expanded open={open.menu} />
    </Box>
  );
}
