"use client";
import { atom } from "recoil";

export const THEME = atom({
  key: "theme",
  default: "system",
});
