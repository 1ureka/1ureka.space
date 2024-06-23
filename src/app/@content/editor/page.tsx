import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { EditOptions, EditTabs } from "@/components/(editor)";

export default function Editor() {
  return (
    <StackM
      {...layoutChildMotionProps}
      direction="row-reverse"
      flexWrap="wrap"
      justifyContent="center"
      sx={{ height: 1, py: 7, px: 9 }}
    >
      <BoxM
        variants={yScaleVar}
        sx={{ flexGrow: 1, minWidth: 375, height: "55vh" }}
      >
        {/* <EditingPreview /> */}
      </BoxM>

      <BoxM variants={yScaleVar} sx={{ minWidth: 375 }}>
        <EditTabs />
        <EditOptions />
      </BoxM>
    </StackM>
  );
}
