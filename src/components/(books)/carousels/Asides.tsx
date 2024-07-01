"use client";

import { Major_Mono_Display } from "next/font/google";
import { useEffect } from "react";
import { useMotionTemplate, useSpring } from "framer-motion";

import { Box, Stack, Typography } from "@mui/material";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import { StackM } from "@/components/Motion";
import { RightClickIcon, LeftClickIcon } from "..";

export default function Asides({
  inset,
  current,
  total,
}: {
  inset: string;
  current: number;
  total: number;
}) {
  return (
    <Box sx={{ position: "absolute", inset, pointerEvents: "none" }}>
      <Hint />

      <Typography
        variant="body2"
        sx={{ position: "absolute", inset: "auto 0 0 auto" }}
      >
        SCROLL TO DISCOVER MORE
      </Typography>

      <Box sx={{ position: "absolute", inset: "auto auto 0 0" }}>
        <Indicator current={current} total={total} />
      </Box>
    </Box>
  );
}

const majorMonoDisplay = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  fallback: ["monospace"],
});

const typoSx = {
  color: "text.secondary",
  lineHeight: "normal",
  ...majorMonoDisplay.style,
} as const;

function Numbers({ type, num }: { type: "large" | "small"; num: string }) {
  const spring = useSpring(0, { stiffness: 37, damping: 8, mass: 0.3 });
  const y = useMotionTemplate`${spring}%`;

  useEffect(() => {
    spring.set(-parseInt(num) * 100);
  }, [spring, num]);

  const numbers = Array(10)
    .fill(0)
    .map((_, i) => i);

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <StackM style={{ y }}>
        {numbers.map((i) => (
          <Typography
            key={i}
            component="span"
            variant={type === "large" ? "h2" : "h4"}
            sx={{
              position: i !== 0 ? "absolute" : "",
              top: i !== 0 ? `${i * 100}%` : "",
              ...typoSx,
            }}
          >
            {i}
          </Typography>
        ))}
      </StackM>
    </Box>
  );
}

function Indicator({ current, total }: { current: number; total: number }) {
  const currentStr = current.toString().padStart(3, "0").split("");
  const totalStr = total.toString().padStart(2, "0").split("");

  return (
    <Stack direction="row" alignItems="flex-end">
      <Numbers type="large" num={currentStr[0]} />
      <Numbers type="large" num={currentStr[1]} />
      <Numbers type="large" num={currentStr[2]} />

      <Typography component="span" variant="h2" sx={typoSx}>
        {"/"}
      </Typography>

      <Numbers type="small" num={totalStr[0]} />
      <Numbers type="small" num={totalStr[1]} />
    </Stack>
  );
}

function Hint() {
  return (
    <Stack
      direction="row"
      alignItems="ceter"
      spacing={3.5}
      sx={{ color: "text.secondary" }}
    >
      <Stack direction="row" alignItems="ceter" spacing={1}>
        <RightClickIcon fontSize="small" />
        <Typography variant="caption">exit</Typography>
      </Stack>

      <Stack direction="row" alignItems="ceter" spacing={1}>
        <LeftClickIcon fontSize="small" />
        <PhotoRoundedIcon fontSize="small" />
        <Typography variant="caption">fullscreen</Typography>
      </Stack>
    </Stack>
  );
}
