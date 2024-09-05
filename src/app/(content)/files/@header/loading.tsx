import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", height: 1 }}>
      <CircularProgress />
    </Box>
  );
}
