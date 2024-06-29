import { usePathname, useRouter } from "next/navigation";
import { Box, Stack } from "@mui/material";
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
      <Content open={open} onToggle={onToggle} />
    </PaperM>
  );
}

function Content({ open, onToggle }: CollapsedProps) {
  const router = useRouter();
  const pathname = usePathname();

  const routeGroups = {
    Books: ["/scene", "/props"],
    Tools: ["/files", "/editor"],
  };

  const isInGroup = (g: "Books" | "Tools") => routeGroups[g].includes(pathname);

  return (
    <Stack sx={{ height: 1, alignItems: "center" }} spacing={2.5}>
      <MenuButton open={open.menu} onClick={() => onToggle("menu")} />

      <Box height={10} />

      <NavIconButton
        label="Books"
        icon={<BookmarkRoundedIcon sx={{ fontSize: "20px" }} />}
        onClick={() => !isInGroup("Books") && router.push(routeGroups.Books[0])}
      />
      <NavIconButton
        label="Tools"
        icon={<BrushRoundedIcon sx={{ fontSize: "20px" }} />}
        onClick={() => !isInGroup("Tools") && router.push(routeGroups.Tools[0])}
      />

      <SpineTitle sx={{ flexGrow: 1, width: 1 }} />

      <SettingButton open={open.setting} onClick={() => onToggle("setting")} />
    </Stack>
  );
}
