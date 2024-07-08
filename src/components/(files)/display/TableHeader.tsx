"use client";

import { useRecoilValue } from "recoil";
import { FILES_SELECTED } from "@/context/store";
import { useSearchParams } from "next/navigation";

import { Stack, Button } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";

import { BoxM, TypographyM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import { NextLinkComposed } from "@/components/Link";

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
        <BoxM variants={yScaleVar}>
          <Button
            startIcon={<DriveFileRenameOutlineRoundedIcon fontSize="small" />}
            disabled={selected.length === 0}
          >
            Modify
          </Button>
        </BoxM>

        <BoxM variants={yScaleVar}>
          <Button
            startIcon={<DeleteRoundedIcon fontSize="small" />}
            disabled={selected.length === 0}
            component={NextLinkComposed}
            to={{ pathname: "/files", query: { category, form: "delete" } }}
          >
            Delete
          </Button>
        </BoxM>
      </Stack>
    </Stack>
  );
}
