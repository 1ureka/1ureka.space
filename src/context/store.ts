"use client";
import { atom, selector } from "recoil";
import type { ImageMetadataWithIndex } from "@/data/type";

//
// books
export const BOOKS_IS_EXPANDED = atom({
  key: "booksIsExpanded",
  default: false,
});
export const BOOKS_SELECT_GROUP = atom({
  key: "booksSelectGroup",
  default: "",
});
export const BOOKS_CAROUSELS = atom({
  key: "booksCarousels",
  default: -1,
});

//
// files
export type FilesTableCol = keyof Pick<
  ImageMetadataWithIndex,
  "name" | "group" | "size" | "createdAt" | "updatedAt"
>;
export const FILES_ORDER = atom<"desc" | "asc">({
  key: "filesOrder",
  default: "asc",
});
export const FILES_ORDER_BY = atom<FilesTableCol>({
  key: "filesOrderBy",
  default: "name",
});
export const FILES_SELECTED = atom<string[]>({
  key: "filesSelected",
  default: [],
});
export const FILES_CURRENT_PAGE = atom<number>({
  key: "filesCurrentPage",
  default: 0,
});
export const FILES_ROWS_PER_PAGE = atom<number>({
  key: "filesRowsPerPage",
  default: 5,
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
