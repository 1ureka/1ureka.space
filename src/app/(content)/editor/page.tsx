import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { Box } from "@mui/material";
import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { EditPanel, EditPreview } from "@/components/(editor)";

export default function EditorContent() {
  return (
    <StackM
      {...layoutChildMotionProps()}
      direction={{ xs: "column", lg: "row" }}
      justifyContent="center"
      gap={12}
      sx={{ py: 7, px: { xs: 3, sm: 9 } }}
    >
      <BoxM variants={yScaleVar} sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            position: { xs: "relative", lg: "sticky" },
            top: { xs: "", lg: 0 },
            width: 1,
            minHeight: 300,
            height: "62.5vh",
          }}
        >
          <EditPreview />
        </Box>
      </BoxM>

      <BoxM variants={yScaleVar} sx={{ width: { xs: 1, lg: 375 } }}>
        <EditPanel />
      </BoxM>
    </StackM>
  );
}
