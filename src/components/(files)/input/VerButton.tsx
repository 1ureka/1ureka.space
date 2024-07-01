"use client";

import { Button } from "@mui/material";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";

export default function VerButton({ children }: { children: React.ReactNode }) {
  return (
    <Button startIcon={<ImageSearchRoundedIcon fontSize="small" />}>
      {children}
    </Button>
  );
}
