import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        width: 1,
        height: 1,
        color: "text.primary",
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
}
