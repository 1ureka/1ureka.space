"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    const success = searchParams.get("success");

    if (error) {
      if (error === "AccessDenied") {
        toast.error("Your GitHub account does not have administrator access.", {
          id: "auth",
        });
      } else {
        toast.error("An error occurred: " + error, { id: "auth" });
      }
    }

    if (success) {
      if (success === "signIn") {
        toast.success("Welcome! You've successfully signed in.", {
          id: "auth",
        });
      } else if (success === "signOut") {
        toast.success("You've been signed out.", { id: "auth" });
      } else {
        toast.success(success, { id: "auth" });
      }
    }
  }, [searchParams]);

  return null;
}
