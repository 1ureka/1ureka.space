"use client";
import { atom } from "recoil";

export const MODE = atom({
  key: "mode",
  default: "system",
});
