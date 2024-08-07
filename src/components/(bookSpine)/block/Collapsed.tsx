import { usePathname, useRouter } from "next/navigation";
import { Box, Stack, useMediaQuery } from "@mui/material";
import type { PaperProps, Theme } from "@mui/material";

import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";

import { MenuButton, NavIconButton, SettingButton, SpineTitle } from "..";
import { PaperM } from "@/components/Motion";
import { createCollapsedVar } from "@/components/MotionProps";

type CollapsedProps = {
  open: { menu: boolean; setting: boolean };
  onToggle: (section: "menu" | "setting") => void;
};

export default function Collapsed({ open, onToggle }: CollapsedProps) {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const containerSx: PaperProps["sx"] = {
    height: isMobile ? "auto" : 1,
    py: isMobile ? 1.5 : 3.5,
    px: isMobile ? 3.5 : 1.5,
    borderRadius: 0,
  };

  return (
    <PaperM
      sx={containerSx}
      variants={isMobile ? createCollapsedVar("y") : createCollapsedVar("x")}
      initial="initial"
      animate={open.menu ? ["open", "animate"] : ["close", "animate"]}
    >
      {isMobile ? (
        <Mobile open={open} onToggle={onToggle} />
      ) : (
        <Desktop open={open} onToggle={onToggle} />
      )}
    </PaperM>
  );
}

function Desktop({ open, onToggle }: CollapsedProps) {
  const router = useRouter();
  const pathname = usePathname();

  const routeGroups = {
    Books: ["/explore", "/scene", "/props"],
    Tools: ["/files", "/editor"],
  };

  const isInGroup = (g: "Books" | "Tools") => {
    return routeGroups[g].some((route) => pathname.startsWith(route));
  };

  return (
    <Stack sx={{ height: 1, alignItems: "center" }} spacing={2.5}>
      <MenuButton open={open.menu} onClick={() => onToggle("menu")} />

      <Box height={10} />

      <NavIconButton
        label="Books"
        icon={<BookmarkRoundedIcon sx={{ fontSize: "20px" }} />}
        onClick={() => !isInGroup("Books") && router.push("/explore/view/0")}
      />
      <NavIconButton
        label="Tools"
        icon={<BrushRoundedIcon sx={{ fontSize: "20px" }} />}
        onClick={() => !isInGroup("Tools") && router.push("/files/images")}
      />

      <SpineTitle />

      <SettingButton open={open.setting} onClick={() => onToggle("setting")} />
    </Stack>
  );
}

function Mobile({ open, onToggle }: CollapsedProps) {
  return (
    <Stack direction="row" spacing={2.5}>
      <MenuButton open={open.menu} onClick={() => onToggle("menu")} />

      <SpineTitle isMobile />

      <SettingButton open={open.setting} onClick={() => onToggle("setting")} />
    </Stack>
  );
}
