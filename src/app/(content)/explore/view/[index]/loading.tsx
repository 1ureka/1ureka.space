import { LinearProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack justifyContent="flex-end" sx={{ position: "relative", height: 1 }}>
      <LinearProgress />
    </Stack>
  );
}
