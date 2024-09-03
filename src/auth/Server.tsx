import "server-only";

import { Suspense } from "react";
import { Avatar, Typography } from "@mui/material";
import { signIn, signOut, validateSession } from "./auth";

import Clients from "./Clients";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

const containerSx = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  placeItems: "center",
  gap: 1,
};

export default async function AuthForm() {
  const session = await validateSession({ redirect: false });

  async function login() {
    "use server";
    await signIn("github", { redirectTo: "/settings/?success=signIn" });
  }

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/settings/?success=signOut" });
  }

  return (
    <BoxM variants={createMotionVar()} sx={containerSx}>
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

      <Suspense>
        <Clients signIn={login} signOut={logout} session={session} />
      </Suspense>
    </BoxM>
  );
}
