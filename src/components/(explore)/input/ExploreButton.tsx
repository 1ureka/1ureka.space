"use client";

import { NextLinkComposed } from "@/components/Link";
import { Fab } from "@mui/material";
import { useParams } from "next/navigation";

export default function ExploreButton({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const params = useParams();

  if (typeof params.index !== "string") {
    throw new Error("Url parameter index is not a valid");
  }

  const index = parseInt(params.index, 10);

  if (Number.isNaN(index)) {
    throw new Error("Url parameter index is not a valid number");
  }

  return (
    <Fab
      component={NextLinkComposed}
      to={`/explore/view/${index}?fullscreen`}
      disabled={disabled}
      variant="extended"
      color="primary"
      sx={{
        mt: -6,
        "&:hover": { bgcolor: "primary.light", scale: "1.1" },
        transition: "all 0.25s",
        scale: "1.001",
        "&:active": { scale: "0.97" },
        width: "fit-content",
      }}
    >
      {children}
    </Fab>
  );
}
