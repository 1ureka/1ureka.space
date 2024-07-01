"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@mui/material";
import type { ImageMetadataWithIndex } from "@/data/table";

export default function Illustration({
  metadata,
}: {
  metadata: ImageMetadataWithIndex;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Image
        src={`/api/image/${metadata.id}/thumbnail`}
        alt={metadata.name}
        fill
        onLoad={() => setLoading(false)}
        unoptimized
      />
      {loading && (
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ width: 1, height: 1 }}
        />
      )}
    </>
  );
}
