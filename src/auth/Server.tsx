import "server-only";

import { Suspense } from "react";
import { Avatar, Typography } from "@mui/material";
import { signIn, signOut, validateSession } from "./auth";

import Clients from "./Clients";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

const containerSx = {
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  placeItems: "center start",
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
        sx={{ width: 36, height: 36, color: "primary.contrastText" }}
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
