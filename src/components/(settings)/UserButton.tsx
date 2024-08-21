import "server-only";

import { Avatar, Button, Typography } from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { auth, signIn, signOut } from "@/auth";

export default async function UserButton() {
  const session = await auth();

  async function login() {
    "use server";
    await signIn("github", { redirectTo: "/settings/?success=signIn" });
  }

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/settings/?success=signOut" });
  }

  return (
    <>
      <Avatar
        src={(session && session.user?.image) ?? undefined}
        sx={{
          border: "2px solid",
          borderColor: "primary.main",
          width: 36,
          height: 36,
        }}
      />

      <Typography sx={{ fontSize: "0.8rem" }}>
        {session
          ? `You are currently signed in as ${session.user?.name}`
          : "You are currently in guest mode"}
      </Typography>

      <form action={session ? logout : login}>
        <Button
          variant="contained"
          startIcon={session ? <LogoutRoundedIcon /> : <LoginRoundedIcon />}
          type="submit"
          sx={{
            scale: "1.001",
            transition: "all 0.25s ease",
            "&:hover": { scale: "1.02", bgcolor: "primary.light" },
            "&:active": { scale: "0.97" },
          }}
        >
          {session ? "Sign out" : "Sign in"}
        </Button>
      </form>
    </>
  );
}
