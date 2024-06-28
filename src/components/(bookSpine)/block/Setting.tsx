import { AnimatePresence } from "framer-motion";
import { Avatar, IconButton, Switch, useColorScheme } from "@mui/material";
import { List, ListItemIcon, ListItemText } from "@mui/material";

import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";

import { AlertM, DividerM, ListItemM, PaperM } from "@/components/Motion";
import { booksSpineExtandedVar, yScaleVar } from "@/components/MotionProps";
import { useRecoilState } from "recoil";
import { BOOKS_IS_EXPANDED } from "@/context/store";

const containerSx = {
  position: "absolute",
  bottom: -10,
  left: "100%",
  p: 3.5,
  transformOrigin: "left",
  borderRadius: "0 20px 0 0",
  border: `solid 1px var(--mui-palette-divider)`,
  borderWidth: "1px 1px 0px 1px",
};

export default function Setting({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <PaperM
          sx={containerSx}
          variants={booksSpineExtandedVar(0.08)}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          <Content />
        </PaperM>
      )}
    </AnimatePresence>
  );
}

function Content() {
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

      <ListItemM variants={yScaleVar}>
        <ListItemIcon>
          <Avatar sx={{ width: 24, height: 24 }} />
        </ListItemIcon>
        <ListItemText primary="Guest" />
        <IconButton size="small" onClick={() => {}}>
          <LoginRoundedIcon fontSize="small" />
        </IconButton>
      </ListItemM>

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
