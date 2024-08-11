"use client";

import { Box, Typography, IconButton } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddLocationRoundedIcon from "@mui/icons-material/AddLocationRounded";
import EditLocationAltRoundedIcon from "@mui/icons-material/EditLocationAltRounded";
import { BoxM } from "@/components/Motion";

export default function PointField({
  from,
  to,
  type,
  onClick,
}: {
  from: string;
  to: string;
  type: "add" | "edit";
  onClick?: () => void;
}) {
  return (
    <BoxM
      layout
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto 1fr auto",
        placeItems: "center",
        gap: 1,
        borderRadius: 1,
        border: "2px solid",
        borderColor: "divider",
        p: 0.5,
        px: 1,
      }}
    >
      <Box sx={{ p: 0.65, bgcolor: "secondary.dark", borderRadius: "50%" }} />

      <Typography>{from}</Typography>
      <ChevronRightRoundedIcon color="action" />
      <Typography>{to}</Typography>

      <IconButton size="small" onClick={onClick} disabled={type === "edit"}>
        {type === "add" ? (
          <AddLocationRoundedIcon fontSize="small" />
        ) : (
          <EditLocationAltRoundedIcon fontSize="small" />
        )}
      </IconButton>
    </BoxM>
  );
}
