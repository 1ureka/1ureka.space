import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Box, CircularProgress, Stack } from "@mui/material";
import type { PaperProps } from "@mui/material";

import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";

import { MenuButton, NavIconButton, SettingButton, SpineTitle } from "..";
import { PaperM } from "@/components/Motion";
import { bookSpineCollapsedVar } from "@/components/MotionProps";

const containerSx: PaperProps["sx"] = {
  height: 1,
  py: 3.5,
  px: 1.5,
  borderRadius: 0,
};

type CollapsedProps = {
  open: { menu: boolean; setting: boolean };
  onToggle: (section: "menu" | "setting") => void;
};

export default function Collapsed({ open, onToggle }: CollapsedProps) {
  return (
    <PaperM
      sx={containerSx}
      variants={bookSpineCollapsedVar}
      initial="initial"
      animate={open.menu ? ["open", "animate"] : ["close", "animate"]}
    >
      <Suspense
        fallback={
          <Stack height={1} justifyContent="center" alignItems="center">
            <CircularProgress size={30} />
          </Stack>
        }
      >
        <Content open={open} onToggle={onToggle} />
      </Suspense>
    </PaperM>
  );
}

function Content({ open, onToggle }: CollapsedProps) {
  const isGuest = useSearchParams().has("guest");

  return (
    <Stack sx={{ height: 1, alignItems: "center" }} spacing={2.5}>
      <MenuButton open={open.menu} onClick={() => onToggle("menu")} />

      <Box height={10} />

      <NavIconButton
        label="Books"
        href="/scene"
        icon={<BookmarkRoundedIcon sx={{ fontSize: "20px" }} />}
        disabled={isGuest}
      />
      <NavIconButton
        label="Tools"
        href="/files"
        icon={<BrushRoundedIcon sx={{ fontSize: "20px" }} />}
        disabled={isGuest}
      />

      <SpineTitle sx={{ flexGrow: 1, width: 1 }} />

      <SettingButton open={open.setting} onClick={() => onToggle("setting")} />
    </Stack>
  );
}
