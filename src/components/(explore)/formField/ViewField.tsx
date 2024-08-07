"use client";

import type { TextFieldProps } from "@mui/material";
import { Box, Radio, TextField, IconButton } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

export default function ViewField({
  TextFieldProps,
  checked,
  onSelect,
  onDelete,
}: {
  TextFieldProps: TextFieldProps;
  checked: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 0.15fr 0.15fr",
        placeItems: "center end",
        borderRadius: 1,
        border: "2px solid",
        borderColor: "divider",
        pr: 1,
      }}
    >
      <TextField
        size="small"
        variant="filled"
        label="name"
        fullWidth
        {...TextFieldProps}
      />

      <IconButton size="small" onClick={onDelete}>
        <DeleteOutlineRoundedIcon fontSize="small" />
      </IconButton>

      <Radio
        checked={checked}
        size="small"
        sx={{ p: 0.5 }}
        onClick={onSelect}
      />
    </Box>
  );
}
