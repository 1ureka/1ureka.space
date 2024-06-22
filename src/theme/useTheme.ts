"use client";

import { useColorScheme } from "@mui/material";
import { useRecoilState } from "recoil";
import { THEME } from "@/context/store";

/** 回傳系統主題模式，可能值為 'dark'（暗色模式）或 'light'（亮色模式）。 */
export const getSystemTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } else {
    return "light";
  }
};

export function useTheme() {
  const [theme, _setTheme] = useRecoilState(THEME);
  const { mode, setMode } = useColorScheme();

  const setTheme = (value: string) => {
    value = value.toLowerCase();
    _setTheme(value);

    if (value === "light" || value === "dark") {
      setMode(value);
    } else {
      setMode(getSystemTheme());
    }
  };

  return { theme: theme ? theme : mode ? mode : "light", setTheme };
}
