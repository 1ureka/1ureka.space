"use client";

import { removeDuplicates } from "@/utils/utils";
import { type Variant, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { BoxM } from "./Motion";
import { Portal, useColorScheme } from "@mui/material";

function createCursorVariants<T extends string>(variants: Record<T, Variant>) {
  return variants;
}

const cursorVariants = createCursorVariants({
  default: {
    width: 10,
    height: 10,
    outlineOffset: "2px",
    outlineWidth: "2px",
    outlineStyle: "solid",
    borderRadius: "10%",
    rotate: 45,
    scale: 1.001,
  },
  hover: {
    width: 5,
    height: 5,
    outlineOffset: "7px",
    borderRadius: "50%",
    scale: 1.5,
  },
});

type CursorVariantType = keyof typeof cursorVariants;

const CURSOR = atom<CursorVariantType[]>({
  key: "cursor",
  default: ["default"],
});

export default function Cursor() {
  const [type, setType] = useRecoilState(CURSOR);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  useEffect(() => {
    const handleMouseover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches(".MuiButtonBase-root, .MuiButtonBase-root *")) {
        setType((prev) => removeDuplicates([...prev, "hover"]));
      }
    };

    const handleMouseout = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches(".MuiButtonBase-root, .MuiButtonBase-root *")) {
        setType((prev) => prev.filter((val) => val !== "hover"));
      }
    };

    document.body.addEventListener("mouseover", handleMouseover);
    document.body.addEventListener("mouseout", handleMouseout);

    return () => {
      document.body.removeEventListener("mouseover", handleMouseover);
      document.body.removeEventListener("mouseout", handleMouseout);
    };
  }, [setType]);

  const colorScheme = useColorScheme();
  const color = colorScheme.mode === "dark" ? "#EDA6C3" : "#156A47";
  //   #198055
  const mixBlendMode = colorScheme.mode === "dark" ? "exclusion" : "difference";
  // colorScheme.mode === "dark"
  //   ? "var(--mui-palette-primary-light)"
  //   : "#0b3825";

  return (
    <Portal>
      <BoxM
        variants={cursorVariants}
        animate={type}
        transition={{ type: "spring", bounce: 0, duration: 0.35 }}
        style={{ x, y }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          outlineColor: color,
          bgcolor: color,
          mixBlendMode,
        }}
      />
    </Portal>
  );
}
