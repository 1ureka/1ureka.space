"use client";
import { atom } from "recoil";

// app(global)
export const THEME = atom({
  key: "theme",
  default: "",
});
export const BOOKS_FOLD = atom({
  key: "booksFold",
  default: true,
});

// page
export const EDITOR_TABS = atom<0 | 1>({
  key: "editorTabs",
  default: 0,
});
export const EDITOR_FILES = atom<{ display: boolean; file: File }[]>({
  key: "editorFiles",
  default: [],
});
export const EDITOR_VALS = atom({
  key: "editorVals",
  default: {
    saturate: 1,
    contrast: 1,
    exposure: 1,
    maxSize: 1,
    scale: 1,
    type: 0,
  },
});
