"use client";
import { Button, ButtonGroup } from "@mui/material";

import { useRecoilState } from "recoil";
import { EDITOR_TABS } from "@/context/store";

export default function Tabs() {
  const [tab, setTab] = useRecoilState(EDITOR_TABS);

  return (
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
  );
}
