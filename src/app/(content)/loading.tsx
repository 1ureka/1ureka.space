import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: "0 0 0 0",
        pointerEvents: "none",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
