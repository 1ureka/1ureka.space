"use client";

import { Button, ButtonMediaWrapper } from "../input/Button";
import { Typography, useColorScheme } from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

const buttonMediaSx = {
  width: 0.5,
  aspectRatio: 1,
  height: "auto",
};

export default function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <Button
        sx={{ py: 3 }}
        active={mode === "light"}
        onClick={() => setMode("light")}
      >
        <ButtonMediaWrapper>
          <LightModeRoundedIcon
            sx={{
              ...buttonMediaSx,
              transform: "rotate(10deg) translateY(15%) translateX(25%)",
            }}
          />
        </ButtonMediaWrapper>
        <Typography variant="h5">Light</Typography>
      </Button>

      <Button
        sx={{ py: 3 }}
        active={mode === "dark"}
        onClick={() => setMode("dark")}
      >
        <ButtonMediaWrapper>
          <DarkModeRoundedIcon
            sx={{
              ...buttonMediaSx,
              transform: "translateY(12%) translateX(25%)",
            }}
          />
        </ButtonMediaWrapper>
        <Typography variant="h5">Dark</Typography>
      </Button>
    </>
  );
}
