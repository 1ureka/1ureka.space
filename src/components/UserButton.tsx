import { Avatar, IconButton } from "@mui/material";
import { ListItemIcon, ListItemText } from "@mui/material";

import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { ListItemM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import { auth, signIn, signOut } from "@/auth";

export default async function UserButton() {
  const session = await auth();

  async function login() {
    "use server";
    await signIn("github");
  }

  async function logout() {
    "use server";
    await signOut();
  }

  return (
    <ListItemM variants={yScaleVar}>
      <ListItemIcon>
        <Avatar
          sx={{ width: 24, height: 24 }}
          src={(session && session.user?.image) ?? undefined}
        />
      </ListItemIcon>

      <ListItemText primary={session ? session.user?.name : "Guest"} />

      <form action={session ? logout : login}>
        <IconButton size="small" type="submit">
          {session ? (
            <LogoutRoundedIcon fontSize="small" />
          ) : (
            <LoginRoundedIcon fontSize="small" />
          )}
        </IconButton>
      </form>
    </ListItemM>
  );
}
