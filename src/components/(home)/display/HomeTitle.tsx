import { Avatar, Stack, Typography } from "@mui/material";

export default function HomeTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={3.5}>
      <Avatar sx={{ width: 56, height: 56 }} />
      <Typography variant="h4" sx={{ letterSpacing: "0.2rem" }}>
        {"1UREKA's SPACE"}
      </Typography>
    </Stack>
  );
}
