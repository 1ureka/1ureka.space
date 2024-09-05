"use client";

import { Major_Mono_Display } from "next/font/google";
import { useEffect } from "react";
import { useMotionTemplate, useSpring } from "framer-motion";
import { useExploreIndex } from "@/hooks";

import { Box, Typography } from "@mui/material";
import { StackM } from "@/components/Motion";

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

function Indicator({ total }: { total: number }) {
  const index = useExploreIndex(total) + 1;
  const currentStr = index.toString().padStart(3, "0").split("");
  const totalStr = total.toString().padStart(2, "0").split("");

  return (
    <Box sx={{ position: "relative", width: 1, height: 1, display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 1,
          pb: 2.5,
        }}
      >
        <Numbers type="large" num={currentStr[0]} />
        <Numbers type="large" num={currentStr[1]} />
        <Numbers type="large" num={currentStr[2]} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Typography component="span" variant="h2" sx={typoSx}>
          {"/"}
        </Typography>
        <Numbers type="small" num={totalStr[0]} />
        <Numbers type="small" num={totalStr[1]} />
      </Box>
    </Box>
  );
}

export default Indicator;
