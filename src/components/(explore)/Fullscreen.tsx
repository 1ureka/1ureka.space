"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Portal, Skeleton } from "@mui/material";

import { BoxM } from "../Motion";
import { createMotionVar } from "../MotionProps";

function FullscreenImage({
  sx,
}: {
  sx?: React.ComponentProps<typeof BoxM>["sx"];
}) {
  return (
    <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", ...sx }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: 1, height: 1 }}
      />
      <Image
        src={`/api/image/clyy2g6g40000v0i3wxcgwwm6/thumbnail`}
        alt=""
        fill
        style={{ objectFit: "cover", filter: "blur(30px)", scale: "1.1" }}
        unoptimized
      />
    </Box>
  );
}

export default function Fullscreen() {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    let lastP = { x: Infinity, y: Infinity };

    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      if (
        Math.abs(clientX - lastP.x) < 25 &&
        Math.abs(clientY - lastP.y) < 25
      ) {
        lastP = { x: clientX, y: clientY };
        return;
      }
      lastP = { x: clientX, y: clientY };
      clearTimeout(timeoutId);
      setIsIdle(false);
      timeoutId = setTimeout(() => {
        setIsIdle(true);
      }, 2000) as unknown as number;
    };

    const handleMouseDown = () => {
      clearTimeout(timeoutId);
      setIsIdle(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    timeoutId = setTimeout(() => {
      setIsIdle(true);
    }, 2000) as unknown as number;

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <BoxM
      variants={createMotionVar({ from: { y: 0, scale: 1 } })}
      sx={{ position: "absolute", inset: 0 }}
    >
      <FullscreenImage />
      <Portal>
        <FullscreenImage
          sx={{
            zIndex: "modal",
            transition: "all 0.5s ease-in-out",
            opacity: isIdle ? 1 : 0,
            pointerEvents: isIdle ? "auto" : "none",
          }}
        />
      </Portal>
    </BoxM>
  );
}
