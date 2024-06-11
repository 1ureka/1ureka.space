import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { absolute: "1ureka's space" },
};

import { Stack } from "@mui/material";
import { BoxM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";

export default function Content() {
  return (
    <BoxM {...layoutChildMotionProps}>
      <Stack direction="row" spacing={3} flexWrap="wrap"></Stack>
    </BoxM>
  );
}
