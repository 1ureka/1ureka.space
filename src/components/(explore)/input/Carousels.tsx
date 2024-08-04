"use client";

import { useEffect } from "react";
import { useSpring, useTransform } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Skeleton, IconButton, Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

import { BoxM, StackM } from "@/components/Motion";
import { yScaleVar, yVar } from "@/components/MotionProps";

const imageWidth = 480;
const imageHeight = 270;

export default function Carousels({
  sx,
  amount,
}: {
  sx?: BoxProps["sx"];
  amount: number;
}) {
  const params = useParams() as { index: string };
  const index = Number(params.index);

  const fakeData = Array(amount)
    .fill(0)
    .map((_, i) => i);

  const containerSx: BoxProps["sx"] = {
    position: "relative",
    overflowX: "hidden",
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

  const prevIndex = (index - 1 + amount) % amount;
  const nextIndex = (index + 1) % amount;

  return (
    <BoxM variants={yVar} sx={containerSx}>
      <Box
        sx={{
          maskImage:
            "linear-gradient(to right, #0000 0%, #000 20%, #000 80%, #0000 100%)",
        }}
      >
        <StackM direction="row" alignItems="center" style={{ x }}>
          {fakeData.map((i) => (
            <CarouselItem
              key={i}
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
        <BoxM variants={yScaleVar}>
          <Link href={`/explore/view/${prevIndex}`}>
            <IconButton aria-label="Previous">
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
        <BoxM variants={yScaleVar}>
          <Link href={`/explore/view/${nextIndex}`}>
            <IconButton aria-label="Next">
              <ArrowRightRoundedIcon />
            </IconButton>
          </Link>
        </BoxM>
      </Box>
    </BoxM>
  );
}

function CarouselItem({ sx }: { sx?: BoxProps["sx"] }) {
  return (
    <Box sx={sx}>
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{
          width: imageWidth,
          height: imageHeight,
          minWidth: imageWidth,
        }}
      />
    </Box>
  );
}
