import { HomeTitle, ThemeMenu } from "@/components";
import { Box, Stack } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ height: 1, p: 8 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HomeTitle />
        <ThemeMenu />
      </Stack>
    </Box>
  );
}
