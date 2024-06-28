"use client";

import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { delay } from "@/utils/client-utils";

interface IllustrationProps {
  group: string;
  thumbnailId: string;
}

export default function Illustration({
  group,
  thumbnailId,
}: IllustrationProps) {
  const [data, setData] = useState("");

  useEffect(() => {
    delay((Math.random() + 1) * 1000).then(() => setData("finished"));
    // TODO: create api route and get data safely
  }, []);

  if (!data)
    return (
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{ width: 1, height: 1 }}
      />
    );

  return <Box sx={{ bgcolor: group, width: 1, height: 1, borderRadius: 1 }} />;
}
