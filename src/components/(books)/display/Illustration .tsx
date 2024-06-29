"use client";

import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { delay } from "@/utils/client-utils";
import type { Metadata } from "@/data/table";

export default function Illustration({ metadata }: { metadata: Metadata }) {
  const [data, setData] = useState("");

  useEffect(() => {
    delay((Math.random() + 1) * 1000).then(() => setData("finished"));
    // TODO: create api route query metadataId and get data safely
  }, []);

  if (!data)
    return (
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{ width: 1, height: 1 }}
      />
    );

  return (
    <Box
      sx={{ bgcolor: metadata.group, width: 1, height: 1, borderRadius: 1 }}
    />
  );
}
