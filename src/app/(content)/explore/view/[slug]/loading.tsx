import { Box, LinearProgress, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        position: "relative",
        width: 1,
        height: 1,
        gridColumn: "2 / span 4",
        gridRow: "2 / span 6",
        boxShadow: 10,
      }}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ position: "absolute", width: 1, height: 1 }}
      />
      <LinearProgress sx={{ position: "absolute", inset: "auto 0 0 0" }} />
    </Box>
  );
}
