import "server-only";

import { Box, Divider, Typography } from "@mui/material";
import NavLink from "./input/NavLink";
import { Dock, DockItem } from "./display/Wrapper";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import BackupTableRoundedIcon from "@mui/icons-material/BackupTableRounded";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import CompareRoundedIcon from "@mui/icons-material/CompareRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export default function Docker() {
  return (
    <Box
      component="nav"
      sx={{
        display: "grid",
        alignItems: "center",
        height: 1,
        maxHeight: "100dvh",
      }}
    >
      <Dock>
        <DockItem title="Home">
          <NavLink href={"/"}>
            <DashboardRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>

        <DockItem isStatic>
          <Divider flexItem />
        </DockItem>

        <DockItem isStatic>
          <Typography variant="caption">BOOK</Typography>
        </DockItem>

        <DockItem title="Explore">
          <NavLink href={"/explore/view/0"}>
            <AutoStoriesRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>
        <DockItem title="Scene">
          <NavLink href={"/gallery/scene"}>
            <CollectionsRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>
        <DockItem title="Props">
          <NavLink href={"/gallery/props"}>
            <CollectionsBookmarkRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>

        <DockItem isStatic>
          <Divider flexItem />
        </DockItem>

        <DockItem isStatic>
          <Typography variant="caption">TOOL</Typography>
        </DockItem>

        <DockItem title="Files">
          <NavLink href={"/files"}>
            <BackupTableRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>
        <DockItem title="Editor">
          <NavLink href={"/editor"}>
            <CompareRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>

        <DockItem isStatic>
          <Box sx={{ height: 48 }} />
        </DockItem>

        <DockItem isStatic>
          <Divider flexItem />
        </DockItem>

        <DockItem title="Settings">
          <NavLink href={"/settings"}>
            <SettingsRoundedIcon fontSize="small" />
          </NavLink>
        </DockItem>
      </Dock>
    </Box>
  );
}
