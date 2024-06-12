import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { absolute: "1ureka's space" },
};

import { Stack, Typography } from "@mui/material";
import { BoxM } from "@/components/Motion";
import { layoutChildMotionProps, yVar } from "@/components/MotionProps";
import { NavCard } from "@/components/(home)";

export default function Content() {
  return (
    <BoxM {...layoutChildMotionProps} sx={{ p: 4 }}>
      <Stack direction="row" gap={7} flexWrap="wrap">
        <Stack spacing={2}>
          <BoxM variants={yVar}>
            <Typography variant="subtitle2">BOOKS</Typography>
          </BoxM>
          <Stack direction="row" gap={3} flexWrap="wrap">
            <NavCard
              label="Scene"
              caption="Anime and game scenes reimagined in realistic detail"
              href="/books/scene"
            />
            <NavCard
              label="Props"
              caption="A collection of 3D models for outdoor scenes, from tiny screws to entire buildings."
              href="/books/props"
            />
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <BoxM variants={yVar}>
            <Typography variant="subtitle2">TOOLS</Typography>
          </BoxM>
          <Stack direction="row" gap={3} flexWrap="wrap">
            <NavCard
              label="File Manager"
              caption="Seamlessly manage album's images with real-time backend syncing."
              href="/tools/manager"
            />
            <NavCard
              label="Image Editor"
              caption="Transform photos with conversion, compression, and filters."
              href="/tools/editor"
            />
          </Stack>
        </Stack>
      </Stack>
    </BoxM>
  );
}
