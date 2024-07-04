"use client";

import { Button } from "@mui/material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";

import { useSetRecoilState } from "recoil";
import { FILES_DIALOG } from "@/context/store";

export default function AddButton({ children }: { children: React.ReactNode }) {
  const setDialog = useSetRecoilState(FILES_DIALOG);
  return (
    <Button
      startIcon={<AddToPhotosRoundedIcon fontSize="small" />}
      onClick={() => setDialog({ open: true, type: "upload" })}
    >
      {children}
    </Button>
  );
}
