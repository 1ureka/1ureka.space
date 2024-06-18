import { useRecoilState } from "recoil";
import { AnimatePresence } from "framer-motion";
import { Divider, Stack, Typography } from "@mui/material";

import { Toggles } from "..";
import { PaperM, StackM } from "@/components/Motion";
import { booksSpineExtandedVar, yScaleVar } from "@/components/MotionProps";
import { useTheme } from "@/utils/hooks";
import { BOOKS_FOLD } from "@/context/store";

const containerSx = {
  position: "absolute",
  bottom: -10,
  left: "100%",
  p: 5,
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
          variants={booksSpineExtandedVar}
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
  const modeOptions = ["Light", "Dark", "System"];
  const { theme, setTheme } = useTheme();

  const displayOptions = ["Fold", "Expand"];
  const [fold, setFold] = useRecoilState(BOOKS_FOLD);
  const display = fold ? "Fold" : "Expand";

  return (
    <Stack sx={{ width: 1, alignItems: "flex-start" }} spacing={2.5}>
      <StackM variants={yScaleVar} width={1} spacing={1.5} alignItems="center">
        <Divider flexItem />
        <Typography variant="subtitle1">Settings</Typography>
      </StackM>

      <StackM variants={yScaleVar} width={1}>
        <Typography variant="caption">MODE</Typography>
        <Toggles
          options={modeOptions}
          value={theme.charAt(0).toUpperCase() + theme.slice(1)}
          onChange={(theme) => setTheme(theme)}
          sx={{ width: "100%" }}
        />
      </StackM>

      <StackM variants={yScaleVar} width={1}>
        <Typography variant="caption">BOOKS DISPLAY</Typography>
        <Toggles
          options={displayOptions}
          value={display}
          onChange={(mode) => setFold(mode === "Fold")}
          sx={{ width: "100%" }}
        />
      </StackM>
    </Stack>
  );
}
