import { Box, LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <LinearProgress sx={{ width: 1 }} />
    </Box>
  );
}
