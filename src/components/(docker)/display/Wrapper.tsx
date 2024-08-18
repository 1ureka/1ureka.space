"use client";

import { Children, cloneElement, forwardRef, useRef } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { Box, Stack } from "@mui/material";
import type { BoxProps } from "@mui/material";
import { StackM, TypographyM } from "@/components/Motion";

export type DockProps = {
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
};

export type DockItemProps = {
  magnification?: number;
  distance?: number;
  mouseY?: any;
  children?: React.ReactNode;
} & ({ isStatic: true; title?: never } | { isStatic?: false; title: string });

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export const Dock = forwardRef<HTMLDivElement, DockProps>(
  (
    {
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
    },
    ref
  ) => {
    const mouseY = useMotionValue(Infinity);

    const renderChildren = () => {
      return Children.map(children, (child: any) => {
        return cloneElement(child, {
          mouseY: mouseY,
          magnification: magnification,
          distance: distance,
        });
      });
    };

    return (
      <Box
        component="nav"
        sx={{ display: "grid", alignItems: "center", height: 1 }}
      >
        <StackM
          ref={ref}
          onMouseMove={(e) => mouseY.set(e.pageY)}
          onMouseLeave={() => mouseY.set(Infinity)}
          alignItems="center"
          gap={1.5}
          sx={{
            position: "relative",
            bgcolor: "content.layer1",
            px: 1.5,
            py: 2.5,
            borderRadius: "0 8px 8px 0",
            outline: "2px solid",
            outlineColor: "divider",
            boxShadow: 2,
          }}
        >
          {renderChildren()}
          <Decoration />
        </StackM>
      </Box>
    );
  }
);

Dock.displayName = "Dock";

export const DockItem = ({
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseY,
  children,
  isStatic = false,
  title,
}: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseY, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };

    return val - bounds.y - bounds.height / 2;
  });

  let heightSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  let height = useSpring(heightSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  if (isStatic) return children;

  return (
    <motion.div
      ref={ref}
      className="dock-item"
      whileHover="hover"
      style={{
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {children}
      <TypographyM
        variant="caption"
        sx={{ height: 0, opacity: 0, fontSize: "0.5rem" }}
        variants={{
          initial: { scale: 0.5 },
          hover: { opacity: 1, scale: 1.6 },
        }}
      >
        {title?.toLowerCase()}
      </TypographyM>
    </motion.div>
  );
};

DockItem.displayName = "DockItem";

function Decoration() {
  const sx: BoxProps["sx"] = {
    width: 20,
    height: 20,
    borderRadius: 2,
    bgcolor: "content.layer1",
    outline: "2px solid",
    outlineColor: "divider",
    boxShadow: 2,
  };

  return (
    <Stack sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          translate: "0 -100%",
          px: 1.5,
          py: 2,
        }}
      >
        <Box sx={sx} />
      </Stack>

      <Stack
        sx={{
          position: "absolute",
          bottom: 0,
          translate: "0 100%",
          px: 1.5,
          py: 2,
        }}
      >
        <Box sx={sx} />
      </Stack>
    </Stack>
  );
}
