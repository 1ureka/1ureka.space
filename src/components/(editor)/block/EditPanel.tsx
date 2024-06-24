"use client";

import { EditOptions, EditTable } from "..";
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";

export default function EditPanel() {
  const [tab, setTab] = useState<0 | 1>(0);

  return (
    <>
      <ButtonGroup
        variant="text"
        size="small"
        sx={{ mb: 4, color: "text.secondary" }}
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
      {tab === 0 ? <EditOptions /> : <EditTable />}
    </>
  );
}
