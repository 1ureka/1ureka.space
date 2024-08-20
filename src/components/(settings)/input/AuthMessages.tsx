"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthMessages({
  success,
  error,
}: {
  success: string | string[] | undefined;
  error: string | string[] | undefined;
}) {
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

  return null;
}
