"use client";
import { BoxM } from "@/components/Motion";
import { layoutMotionProps } from "@/components/MotionProps";
import { Portal } from "@mui/material";
import { AnimatePresence } from "framer-motion";

export default function PortalContainer({
  children,
  id,
  show,
}: {
  children: React.ReactNode;
  id: string;
  show?: boolean;
}) {
  return (
    <Portal container={() => document.getElementById(id)}>
      <AnimatePresence>
        {show && (
          <BoxM
            {...layoutMotionProps}
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              zIndex: "drawer",
            }}
          >
            {children}
          </BoxM>
        )}
      </AnimatePresence>
    </Portal>
  );
}
