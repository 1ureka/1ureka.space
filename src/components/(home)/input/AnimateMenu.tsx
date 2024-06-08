"use client";
import { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";

export default function AnimateMenu() {
  const [state, setState] = useState("play");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const options = [
    {
      icon: <PlayArrowRoundedIcon fontSize="small" />,
      label: "Play",
      get value() {
        return this.label.toLowerCase();
      },
    },
    {
      icon: <SkipNextRoundedIcon fontSize="small" />,
      label: "Skip",
      get value() {
        return this.label.toLowerCase();
      },
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const createSelectHandler = (value: string) => () => {
    if (value === "play" || value === "skip") setState(value);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="Intro Control">
        <IconButton onClick={handleClick}>
          <PlayCircleRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        {options.map(({ label, value, icon }) => (
          <MenuItem
            key={label}
            onClick={createSelectHandler(value)}
            selected={state === value}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
