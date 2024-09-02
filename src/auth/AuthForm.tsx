"use client";

import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";
import { Button, TextField } from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { signIn, signOut } from "./actions";
import { useTransition } from "react";
import toast from "react-hot-toast";

const containerSx = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  placeItems: "center",
  gap: 1,
};

export default function AuthForm({ key }: { key: string | null }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData: FormData) => {
        startTransition(async () => {
          if (key) {
            await signOut();
          } else {
            const { error } = await signIn(formData);
            error.forEach((message) => toast.error(message));
          }
        });
      }}
    >
      <BoxM variants={createMotionVar()} sx={containerSx}>
        <TextField
          name="password"
          label="Password"
          type="password"
          required
          variant="filled"
          size="small"
          fullWidth
          disabled={Boolean(key)}
          defaultValue={key && "*************"}
        />

        <Button
          variant="contained"
          startIcon={key ? <LogoutRoundedIcon /> : <LoginRoundedIcon />}
          type="submit"
          disabled={isPending}
          sx={{
            scale: "1.001",
            transition: "all 0.25s ease",
            "&:hover": { scale: "1.02", bgcolor: "primary.light" },
            "&:active": { scale: "0.97" },
          }}
        >
          {key ? "Sign out" : "Sign in"}
        </Button>
      </BoxM>
    </form>
  );
}
