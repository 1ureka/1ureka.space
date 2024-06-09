import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "books",
};

import { BoxM } from "@/components/Motion";
import { Typography } from "@mui/material";

export default function Scene() {
  return (
    <BoxM
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Typography variant="h4">Scene</Typography>
    </BoxM>
  );
}
