"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useState } from "react";
import { useRecoilValue } from "recoil";
import { FILES_SELECTED } from "@/context/store";

import { Stack, Button, Menu, MenuItem, Checkbox } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

import { BoxM, TypographyM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

export default function TableHeader() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "scene";
  const selected = useRecoilValue(FILES_SELECTED);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      sx={{ p: 1.5, pl: 1 }}
      justifyContent="space-between"
      alignItems="center"
    >
      <BoxM variants={yScaleVar}>
        <Button
          onClick={handleClick}
          startIcon={<FilterListRoundedIcon />}
          variant="outlined"
        >
          Filter List
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={handleClose}
            component={Link}
            href="/files/images?category=scene"
            sx={{ alignItems: "center", gap: 1.25, pl: 0 }}
            dense
          >
            <Checkbox checked={category === "scene"} size="small" />
            Scene
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={Link}
            href="/files/images?category=props"
            sx={{ alignItems: "center", gap: 1.25, pl: 0 }}
            dense
          >
            <Checkbox checked={category === "props"} size="small" />
            Props
          </MenuItem>
        </Menu>
      </BoxM>

      <Stack direction="row" alignItems="center" gap={1.5}>
        <TypographyM
          variants={yScaleVar}
          sx={{ pr: 1.5, textTransform: "uppercase" }}
          variant="subtitle2"
        >
          {selected.length} Selected:
        </TypographyM>

        <BoxM variants={yScaleVar}>
          <Button
            startIcon={<DriveFileRenameOutlineRoundedIcon fontSize="small" />}
            disabled={selected.length === 0}
            component={Link}
            href={`/files/images?category=${category}&form=modify`}
          >
            Modify
          </Button>
        </BoxM>

        <BoxM variants={yScaleVar}>
          <Button
            startIcon={<DownloadRoundedIcon fontSize="small" />}
            disabled={selected.length === 0}
          >
            Download
          </Button>
        </BoxM>

        <BoxM variants={yScaleVar}>
          <Button
            startIcon={<DeleteRoundedIcon fontSize="small" />}
            disabled={selected.length === 0}
            component={Link}
            href={`/files/images?category=${category}&form=delete`}
            color="error"
          >
            Delete
          </Button>
        </BoxM>
      </Stack>
    </Stack>
  );
}
