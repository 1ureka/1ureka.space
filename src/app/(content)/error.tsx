"use client";

import ErrorBlock from "@/components/ErrorBlock";
import { Button } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorBlock
      error={error}
      action={<Button onClick={reset}>Try again</Button>}
    />
  );
}
