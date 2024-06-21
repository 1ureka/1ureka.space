"use client";
import { atom } from "recoil";

export const THEME = atom({
  key: "theme",
  default: "",
});
export const BOOKS_FOLD = atom({
  key: "booksFold",
  default: true,
});
