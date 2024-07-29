import { AnimatePresence } from "framer-motion";
import { Switch, useColorScheme, useMediaQuery } from "@mui/material";
import { List, ListItemIcon, ListItemText } from "@mui/material";
import type { PaperProps, Theme } from "@mui/material";

import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";

import { AlertM, DividerM, ListItemM, PaperM } from "@/components/Motion";
import { createExtandedVar, yScaleVar } from "@/components/MotionProps";
import { useRecoilState } from "recoil";
import { BOOKS_IS_EXPANDED } from "@/context/store";

export default function Setting({
  open,
  UserButton,
}: {
  open: boolean;
  UserButton: React.ReactNode;
}) {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const containerSx: PaperProps["sx"] = {
    position: "absolute",
    inset: isMobile ? "auto auto 100% auto" : "auto auto -10px 100%",

    width: isMobile ? 1 : "auto",
    p: 3.5,
    transformOrigin: isMobile ? "bottom" : "left",

    boxShadow: "none",
    borderRadius: "0 20px 0 0",
    borderLeft: isMobile ? "" : `solid 1px var(--mui-palette-divider)`,
    borderBottom: isMobile ? `solid 1px var(--mui-palette-divider)` : "",
  };

  return (
    <AnimatePresence>
      {open && (
        <PaperM
          sx={containerSx}
          variants={createExtandedVar(0.08, isMobile ? "y" : "x")}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          <Content UserButton={UserButton} />
        </PaperM>
      )}
    </AnimatePresence>
  );
}

function Content({ UserButton }: { UserButton: React.ReactNode }) {
  const { mode, setMode } = useColorScheme();
  const [isExpanded, setIsExpanded] = useRecoilState(BOOKS_IS_EXPANDED);

  return (
    <List>
      <AlertM
        variants={yScaleVar}
        icon={<WarningRoundedIcon fontSize="inherit" />}
        severity="warning"
        sx={{ whiteSpace: "nowrap" }}
      >
        * Sign In is for internal only
      </AlertM>

      {UserButton}

      <DividerM variants={yScaleVar} flexItem />

      <ListItemM variants={yScaleVar}>
        <ListItemIcon>
          <DashboardCustomizeRoundedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Expand photos (books)" />
        <Switch
          size="small"
          edge="end"
          onChange={() => setIsExpanded((prev) => !prev)}
          checked={isExpanded}
        />
      </ListItemM>

      <ListItemM variants={yScaleVar}>
        <ListItemIcon>
          <DarkModeRoundedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Dark mode" />
        <Switch
          size="small"
          edge="end"
          onChange={() => setMode(mode === "dark" ? "light" : "dark")}
          checked={mode === "dark"}
        />
      </ListItemM>
    </List>
  );
}
