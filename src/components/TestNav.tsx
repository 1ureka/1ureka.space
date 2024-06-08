import { Button, Toolbar } from "@mui/material";
import React from "react";
import { NextLinkComposed } from "./Link";

export default function TestNav() {
  return (
    <Toolbar>
      <Button component={NextLinkComposed} to={{ pathname: "/gallery/scene" }}>
        scene link
      </Button>
      <Button component={NextLinkComposed} to={{ pathname: "/gallery/props" }}>
        props link
      </Button>
      <Button component={NextLinkComposed} to={{ pathname: "/tools/manager" }}>
        manager link
      </Button>
      <Button component={NextLinkComposed} to={{ pathname: "/tools/editor" }}>
        editor link
      </Button>
    </Toolbar>
  );
}
