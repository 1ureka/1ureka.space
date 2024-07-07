"use client";

import { useRecoilValue } from "recoil";
import { FILES_SELECTED } from "@/context/store";
import { useSearchParams } from "next/navigation";

import { Stack } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";

import { ButtonM, TypographyM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import Link from "next/link";

export default function TableHeader() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "scene";
  const selected = useRecoilValue(FILES_SELECTED);

  return (
    <Stack
      direction="row"
      sx={{ p: 1.5, pl: 2.5 }}
      justifyContent="space-between"
      alignItems="center"
    >
      <TypographyM variant="button" variants={yScaleVar}>
        {selected.length} Selected
      </TypographyM>

      <Stack direction="row" alignItems="center" spacing={1.5}>
        <ButtonM
          startIcon={<DriveFileRenameOutlineRoundedIcon fontSize="small" />}
          disabled={selected.length === 0}
          variants={yScaleVar}
        >
          Modify
        </ButtonM>

        <Link
          href={{ pathname: "/files", query: { category, form: "delete" } }}
        >
          <ButtonM
            startIcon={<DeleteRoundedIcon fontSize="small" />}
            disabled={selected.length === 0}
            variants={yScaleVar}
          >
            Delete
          </ButtonM>
        </Link>
      </Stack>
    </Stack>
  );
}
