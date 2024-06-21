import { LinearProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack
      sx={{ height: 1, justifyContent: "flex-end", alignItems: "stretch" }}
    >
      <LinearProgress />
    </Stack>
  );
}
