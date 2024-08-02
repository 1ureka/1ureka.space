import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "books",
};

import { Box } from "@mui/material";

const fakeViewport = {
  id: "cjs0v5z5z0000j1qg1z1z1z1z",
  exploreId: "cjs0v5z5z0000j1qg1z1z1z1z",
  points: [
    {
      x: 0.0,
      y: 0.0,
      sourceId: "cjs0v5z5z0000j1qg1z1z1z1z",
      targetId: "cjs0v5z5z0000j1qg1z1z1z1z",
    },
    {
      x: 0.0,
      y: 0.0,
      sourceId: "cjs0v5z5z0000j1qg1z1z1z1z",
      targetId: "cjs0v5z5z0000j1qg1z1z1z1z",
    },
  ],
};

export default function ExploreContent({
  params: { index },
}: {
  params: { index: number };
}) {
  return <Box sx={{ minHeight: "calc(100vw * 0.375)" }}></Box>;
}
