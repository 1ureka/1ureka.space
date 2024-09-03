"use client";

import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import type { Session } from "next-auth";
import { useSearchParams } from "next/navigation";

import { Button } from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

type ClinetsProps = {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  session: Session | null;
};

function useMessages() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");

  useEffect(() => {
    if (typeof error === "string") {
      if (error === "AccessDenied") {
        toast.error("Your GitHub account does not have administrator access.", {
          id: "authError",
        });
      } else {
        toast.error("An error occurred: " + error, { id: "authError" });
      }
    }

    if (typeof success === "string") {
      if (success === "signIn") {
        toast.success("Welcome! You've successfully signed in.", {
          id: "authSuccess",
        });
      } else if (success === "signOut") {
        toast.success("You've been signed out.", { id: "authSuccess" });
      } else {
        toast.success(success, { id: "authSuccess" });
      }
    }
  }, [success, error]);
}

export default function Clients({ signIn, signOut, session }: ClinetsProps) {
  useMessages();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="contained"
      startIcon={session ? <LogoutRoundedIcon /> : <LoginRoundedIcon />}
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          session ? await signOut() : await signIn();
        });
      }}
      sx={{
        scale: "1.001",
        transition: "all 0.25s ease",
        "&:hover": { scale: "1.02", bgcolor: "primary.light" },
        "&:active": { scale: "0.97" },
      }}
    >
      {session ? "Sign out" : "Sign in"}
    </Button>
  );
}
