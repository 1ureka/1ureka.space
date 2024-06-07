"use client";

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
