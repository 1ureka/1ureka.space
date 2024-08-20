import dynamic from "next/dynamic";
export const ThemeToggle = dynamic(() => import("./block/ThemeToggle"), {
  ssr: false,
});

export { default as DisplayToggle } from "./block/DisplayToggle";
