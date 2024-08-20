import dynamic from "next/dynamic";
export const ThemeToggle = dynamic(() => import("./block/ThemeToggle"), {
  ssr: false,
});

export { default as DisplayToggle } from "./block/DisplayToggle";
export { default as UserButton } from "./input/UserButton";
export { default as AuthMessages } from "./input/AuthMessages";
