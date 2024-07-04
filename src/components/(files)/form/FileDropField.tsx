"use client";

import { type DropzoneOptions, useDropzone } from "react-dropzone";
import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import OpenInBrowserRoundedIcon from "@mui/icons-material/OpenInBrowserRounded";
import { ButtonBaseM } from "@/components/Motion";

export default function FileDropField({
  dropOptions,
}: {
  dropOptions: DropzoneOptions;
}) {
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropOptions);

  const { palette } = useTheme();
  const activeBgColor = alpha(palette.primary.main, 0.5);

  const rootSx = {
    width: 1,
    bgcolor: isDragActive ? activeBgColor : "divider",
    borderRadius: 2,
    border: "dashed 2px",
    borderColor: "divider",
  };

  return (
    <ButtonBaseM sx={rootSx} {...getRootProps()} layout>
      <Stack sx={{ p: 3, color: "text.secondary" }}>
        <Box>
          <OpenInBrowserRoundedIcon fontSize="large" />
        </Box>
        <Typography>
          {isDragActive
            ? "Release to upload"
            : "Drag and drop files here or click to browse"}
        </Typography>
      </Stack>

      <input {...getInputProps()} />
    </ButtonBaseM>
  );
}
