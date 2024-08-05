"use client";

import { NextLinkComposed } from "@/components/Link";
import { isValidIndex } from "@/utils/utils";
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
  const index = isValidIndex(params.index, 10);
  if (index === -1) return null;

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
