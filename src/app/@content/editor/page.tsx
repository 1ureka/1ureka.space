import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { EditOptions } from "@/components/(editor)";

export default function Editor() {
  return (
    <StackM {...layoutChildMotionProps} direction="row" sx={{ height: 1 }}>
      <BoxM variants={yScaleVar} sx={{ width: 0.25, height: 1 }}>
        <EditOptions />
      </BoxM>

      <BoxM variants={yScaleVar} sx={{ width: 0.5, height: 1 }}>
        {/* <EditingPreview /> */}
      </BoxM>

      <StackM
        variants={yScaleVar}
        sx={{ width: 0.25, height: 1, py: 3, px: 4 }}
        spacing={3}
      >
        {/* <InputArea />
        <Table /> */}
      </StackM>
    </StackM>
  );
}
