"use client";

import { Button } from "@mui/material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";

export default function AddButton({ children }: { children: React.ReactNode }) {
  return (
    <Button startIcon={<AddToPhotosRoundedIcon fontSize="small" />}>
      {children}
    </Button>
  );
}
