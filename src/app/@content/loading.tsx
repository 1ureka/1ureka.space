import { LinearProgress, Stack } from "@mui/material";

export default function loading() {
  return (
    <Stack
      sx={{ height: 1, justifyContent: "flex-end", alignItems: "stretch" }}
    >
      <LinearProgress />
    </Stack>
  );
}
