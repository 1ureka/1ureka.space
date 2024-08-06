"use client";

import { Box, Stack } from "@mui/material";
import { Radio, TextField, IconButton } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

export default function VariantField({
  checked,
  onDelete,
  onSelect,
}: {
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
      <Stack direction="row" sx={{ width: 1 }}>
        <TextField size="small" variant="filled" label="name" fullWidth />
        <TextField size="small" variant="filled" label="group" fullWidth />
      </Stack>

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
