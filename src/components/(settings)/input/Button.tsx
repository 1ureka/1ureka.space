"use client";

import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";
import { Box, ButtonBase } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

export function Button({
  color = "primary",
  active,
  sx,
  children,
  onClick,
}: {
  color?: "primary" | "secondary";
  active?: boolean;
  sx?: React.ComponentProps<typeof ButtonBase>["sx"];
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const activeSx = {
    outline: "2px solid",
    outlineOffset: -2,
    outlineColor: color === "primary" ? "primary.main" : "secondary.dark",
    color: color === "primary" ? "primary.light" : "secondary.dark",
  };

  return (
    <BoxM variants={createMotionVar()} sx={{ width: 1 }}>
      <ButtonBase
        onClick={onClick}
        sx={{
          position: "relative",
          width: 1,
          bgcolor: "#88888850",
          color: "text.secondary",
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.25s ease",
          scale: "1.001",
          "&:hover": { bgcolor: "#88888830", scale: "1.03" },
          "&:active": { scale: "0.97" },
          ...(active ? activeSx : {}),
          ...sx,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "end start",
            p: 1,
          }}
        >
          {children}
          {active && (
            <CheckCircleOutlineRoundedIcon
              sx={{
                position: "absolute",
                inset: "auto 0 0 auto",
                m: 1,
                color: color === "primary" ? "primary.main" : "secondary.dark",
              }}
            />
          )}
        </Box>
      </ButtonBase>
    </BoxM>
  );
}

export function ButtonMediaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        display: "grid",
        placeItems: "center",
        "& > *": { opacity: 0.3 },
      }}
    >
      {children}
    </Box>
  );
}
