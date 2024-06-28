"use client";
import { atom, selector } from "recoil";

//
// books
export const BOOKS_CAROUSELS = atom({
  key: "booksCarousels",
  default: "",
});

//
// editor
export const EDITOR_ORDER = atom<"desc" | "asc">({
  key: "editorOrder",
  default: "asc",
});
export const EDITOR_FILES = atom<
  { selected: boolean; display: boolean; file: File }[]
>({
  key: "editorFiles",
  default: [],
});
export const EDITOR_ORDERED_FILES = selector({
  key: "editorOrderedFiles",
  get: ({ get }) => {
    const files = get(EDITOR_FILES);
    const order = get(EDITOR_ORDER);
    const sortOrder = order === "desc" ? -1 : 1;
    return files
      .slice()
      .sort((a, b) => a.file.name.localeCompare(b.file.name) * sortOrder);
  },
});
export const EDITOR_VALS = atom({
  key: "editorVals",
  default: {
    saturate: 1,
    contrast: 1,
    exposure: 1,
    maxSize: 1,
    scale: 1,
    type: "jpeg",
  },
});
