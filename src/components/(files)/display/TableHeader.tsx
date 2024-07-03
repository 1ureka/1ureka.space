"use client";

import { useRecoilValue } from "recoil";
import { FILES_SELECTED } from "@/context/store";

import { Button, Stack, Typography } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";

export default function TableHeader() {
  const selected = useRecoilValue(FILES_SELECTED);

  return (
    <Stack
      direction="row"
      sx={{ p: 1.5, pl: 2.5 }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="button">{selected.length} Selected</Typography>

      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Button
          startIcon={<DriveFileRenameOutlineRoundedIcon fontSize="small" />}
          disabled={selected.length === 0}
        >
          Modify
        </Button>
        <Button
          startIcon={<DeleteRoundedIcon fontSize="small" />}
          disabled={selected.length === 0}
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
}
