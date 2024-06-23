import { Box, LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ pt: 6 }}>
      <LinearProgress />
    </Box>
  );
}
