"use client";
import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import ContrastRoundedIcon from "@mui/icons-material/ContrastRounded";
import { useTheme } from "@/utils/hooks";

export default function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const options = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const createSelectHandler = (value: string) => () => {
    setTheme(value);
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
        {options.map(({ label, value }) => (
          <MenuItem
            key={value}
            onClick={createSelectHandler(value)}
            selected={theme === value}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
