import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "unarthurized",
};

import ErrorBlock from "@/components/ErrorBlock";
import Link from "next/link";
import { Button } from "@mui/material";

export default function UnAuth() {
  return (
    <ErrorBlock
      error={new Error("401: Unauthorized")}
      action={
        <Button href="/settings" component={Link}>
          Sign In
        </Button>
      }
    />
  );
}
