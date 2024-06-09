import { Box, Stack } from "@mui/material";

import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";

import { MenuButton, NavIconButton, SettingButton, SpineTitle } from ".";
import { PaperM, bookSpineCollapsedVar } from "@/components/Motion";

export default function Collapsed({
  open,
  onToggle,
}: {
  open: { menu: Boolean; setting: Boolean };
  onToggle: (section: "menu" | "setting") => void;
}) {
  const containerSx = { height: 1, py: 3.5, px: 1.5, borderRadius: 0 };

  return (
    <PaperM
      sx={containerSx}
      variants={bookSpineCollapsedVar}
      initial="initial"
      animate={open.menu ? ["open", "animate"] : ["close", "animate"]}
    >
      <Stack sx={{ height: 1, alignItems: "center" }} spacing={2.5}>
        <MenuButton open={open.menu} onClick={() => onToggle("menu")} />

        <Box height={10} />

        <NavIconButton
          label="Books"
          href="/books/scene"
          icon={<BookmarkRoundedIcon sx={{ fontSize: "20px" }} />}
        />
        <NavIconButton
          label="Tools"
          href="/tools/manager"
          icon={<BrushRoundedIcon sx={{ fontSize: "20px" }} />}
        />

        <SpineTitle sx={{ flexGrow: 1, width: 1 }} />

        <SettingButton
          open={open.setting}
          onClick={() => onToggle("setting")}
        />
      </Stack>
    </PaperM>
  );
}
