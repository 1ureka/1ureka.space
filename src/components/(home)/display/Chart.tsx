"use client";

import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
const PieChart = dynamic(() =>
  import("@mui/x-charts/PieChart").then(({ PieChart }) => PieChart)
);

import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

type Data = { value: number; label: string; color: string }[];

const size = 30;

const innerRadius = size - 15;
const outerRadius = size;

const fadedInnerRadius = innerRadius + 2.5;
const additionalRadius = -2.5;

export default function Chart({ data }: { data: Data }) {
  const amount = data.reduce((acc, { value }) => acc + value, 0);
  const remain = 256 - amount;

  if (remain < 0) {
    throw new Error("Invalid data");
  }

  const remainData = { value: remain, label: "remain", color: "#88888850" };
  const dataWithRemain = [...data, remainData];

  return (
    <StackM
      variants={yScaleVar}
      direction={{ xs: "column", sm: "column", md: "row" }}
      alignItems="flex-end"
      gap={2}
    >
      <StackM variants={yScaleVar}>
        <Typography variant="subtitle1">Storage: </Typography>
        <Typography variant="body2">{amount} / 256 MB</Typography>
      </StackM>

      <PieChart
        series={[
          {
            data: dataWithRemain,
            innerRadius,
            outerRadius,
            paddingAngle: 2.5,
            cornerRadius: 2.5,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: {
              innerRadius: fadedInnerRadius,
              additionalRadius,
              color: "gray",
            },
            cx: size - 5,
            cy: size - 5,
          },
        ]}
        width={size * 2}
        height={size * 2}
        slotProps={{ legend: { hidden: true } }}
      />
    </StackM>
  );
}
