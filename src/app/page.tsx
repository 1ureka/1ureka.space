import { AnimateMenu, HomeTitle, ThemeMenu } from "@/components";
import { PasswordInput, UserInput } from "@/components";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

export default function Home() {
  return (
    <Stack sx={{ height: 1, p: 8 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HomeTitle />
        <Stack direction="row" alignItems="center" spacing={1}>
          <AnimateMenu />
          <ThemeMenu />
        </Stack>
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1, width: 0.5 }}
      >
        <Stack spacing={4} sx={{ width: 0.7, maxWidth: 420 }}>
          <Stack alignItems="center" spacing={1}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <LockRoundedIcon />
            </Avatar>
            <Typography variant="h5">Unlock</Typography>
          </Stack>

          {/* component="form" */}
          <Stack spacing={2}>
            <UserInput />
            <PasswordInput />
          </Stack>
          <Button variant="contained" sx={{ width: 1 }}>
            Sign In
          </Button>
          <Divider>
            <Typography variant="body2">OR</Typography>
          </Divider>
        </Stack>
      </Stack>

      <Stack alignItems="center">
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Copyright © 1ureka. All rights reserved.
        </Typography>
      </Stack>
    </Stack>
  );
}
