"use client";
import { useState } from "react";
import { Backdrop, Box } from "@mui/material";
import Collapsed from "./(collapsed)/Collapsed";
import Expanded from "./(expanded)/Expanded";
import Setting from "./(setting)/Setting";

export default function BookSpine() {
  const [open, setOpen] = useState({ menu: false, setting: false });

  const handleToggle = (section: "menu" | "setting") => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Box
      data-mui-color-scheme="dark"
      sx={{ position: "relative", height: 1, zIndex: "drawer" }}
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
