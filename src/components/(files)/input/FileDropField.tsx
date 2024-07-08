"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";

import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import OpenInBrowserRoundedIcon from "@mui/icons-material/OpenInBrowserRounded";
import { ButtonBaseM } from "@/components/Motion";

export default function FileDropField({
  onAppend,
}: {
  onAppend: (files: File[]) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejects: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        onAppend(acceptedFiles);
      }

      if (rejects.length > 0) {
        rejects.forEach(({ errors }) =>
          errors.forEach(({ message }) => toast.error(message))
        );
      }
    },
    [onAppend]
  );

  const onError = useCallback(() => {
    toast.error(`Something went wrong`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    onDrop,
    onError,
  });

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
