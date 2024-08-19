"use client";

import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";

export default function EditPanel({
  options,
  output,
}: {
  options: React.ReactNode;
  output: React.ReactNode;
}) {
  const [tab, setTab] = useState<0 | 1>(0);

  return (
    <>
      <ButtonGroup
        variant="text"
        size="small"
        sx={{ color: "text.secondary" }}
        fullWidth
      >
        <Button
          onClick={() => setTab(0)}
          color={tab === 0 ? "primary" : "inherit"}
        >
          Options
        </Button>
        <Button
          onClick={() => setTab(1)}
          color={tab === 1 ? "primary" : "inherit"}
        >
          Output
        </Button>
      </ButtonGroup>
      {tab === 0 ? options : output}
    </>
  );
}
