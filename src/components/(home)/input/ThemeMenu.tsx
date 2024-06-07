"use client";
import { useState } from "react";

import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useColorScheme } from "@mui/material";
import ContrastRoundedIcon from "@mui/icons-material/ContrastRounded";
import { getSystemTheme } from "@/utils/client-utils";
import { useRecoilState } from "recoil";
import { MODE } from "@/context/store";

export default function ThemeMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const options = ["Light", "Dark", "System"];
  const { setMode } = useColorScheme();
  const [state, setState] = useRecoilState(MODE);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const createSelectHandler = (value: string) => () => {
    setState(value);

    if (value === "light" || value === "dark") {
      setMode(value);
    } else {
      setMode(getSystemTheme());
    }

    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="Theme">
        <IconButton onClick={handleClick}>
          <ContrastRoundedIcon fontSize="small" />
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
        {options.map((val) => (
          <MenuItem
            key={val}
            onClick={createSelectHandler(val.toLowerCase())}
            selected={state === val.toLowerCase()}
          >
            {val}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
