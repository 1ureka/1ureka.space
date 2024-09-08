"use client";

import { useEffect } from "react";
import { useSpring, useTransform } from "framer-motion";
import { useExploreIndex } from "@/hooks";
import Link from "next/link";

import { Skeleton, IconButton, Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

import { BoxM, StackM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";
import Image from "next/image";

const imageWidth = 240;
const imageHeight = (240 * 9) / 16;

export default function Carousels({
  sx,
  srcList,
}: {
  sx?: BoxProps["sx"];
  srcList: string[];
}) {
  const total = srcList.length;
  const index = useExploreIndex(total);

  const containerSx: BoxProps["sx"] = {
    position: "relative",
    overflowX: "hidden",
    overflowY: "hidden",
    ...sx,
  };

  const spring = useSpring(0, { stiffness: 110, damping: 22 });

  useEffect(() => {
    spring.set(index);
  }, [spring, index]);

  const x = useTransform(
    spring,
    (latest) => `calc(50% - ${latest * imageWidth}px)`
  );

  if (index === -1) return null;

  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  return (
    <Box sx={containerSx}>
      <Box
        sx={{
          maskImage:
            "linear-gradient(to right, #0000 0%, #000 20%, #000 80%, #0000 100%)",
        }}
      >
        <StackM
          direction="row"
          alignItems="center"
          style={{ x }}
          sx={{ overflowY: "visible", overflowX: "vidible" }}
        >
          {srcList.map((src, i) => (
            <CarouselItem
              key={i}
              src={src}
              sx={{
                scale: i === index ? "0.95" : "0.8",
                translate: i === index ? "-50% -5px" : "-50% 5px",
                transition: "translate 0.2s, scale 0.2s",
              }}
            />
          ))}
        </StackM>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <BoxM variants={createMotionVar()}>
          <Link href={`/explore/view/${prevIndex}`} scroll={false}>
            <IconButton
              aria-label="Previous"
              sx={{
                transition: "all 0.2s ease",
                scale: "0.9",
                "&:hover": { scale: "1" },
                "&:active": { scale: "0.9" },
              }}
            >
              <ArrowLeftRoundedIcon />
            </IconButton>
          </Link>
        </BoxM>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <BoxM variants={createMotionVar()}>
          <Link href={`/explore/view/${nextIndex}`} scroll={false}>
            <IconButton
              aria-label="Next"
              sx={{
                transition: "all 0.2s ease",
                scale: "0.9",
                "&:hover": { scale: "1" },
                "&:active": { scale: "0.9" },
              }}
            >
              <ArrowRightRoundedIcon />
            </IconButton>
          </Link>
        </BoxM>
      </Box>
    </Box>
  );
}

function CarouselItem({ sx, src }: { sx?: BoxProps["sx"]; src: string }) {
  return (
    <Box sx={{ position: "relative", ...sx }}>
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{
          width: imageWidth,
          height: imageHeight,
          minWidth: imageWidth,
        }}
      />
      <Image
        unoptimized
        src={src}
        alt="image"
        width={imageWidth}
        height={imageHeight}
        style={{ position: "absolute", inset: 0 }}
      />
    </Box>
  );
}
