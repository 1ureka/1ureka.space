import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { Box } from "@mui/material";
import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { EditOptions, EditTabs, EditPreview } from "@/components/(editor)";

export default function Editor() {
  return (
    <StackM
      {...layoutChildMotionProps}
      direction="row-reverse"
      flexWrap="wrap"
      justifyContent="center"
      gap={7}
      sx={{ height: 1, pt: 5, pb: 7, px: 9 }}
    >
      <BoxM variants={yScaleVar} sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            minWidth: 375,
            width: 1,
            maxWidth: "max(80vh, 375px)",
            minHeight: 300,
            height: "62.5vh",
            mx: "auto",
          }}
        >
          <EditPreview />
        </Box>
      </BoxM>

      <BoxM variants={yScaleVar} sx={{ minWidth: 375 }}>
        <EditTabs />
        <EditOptions />
      </BoxM>
    </StackM>
  );
}
