import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { useState } from "react";
import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { EditOptionValues, EditOptions } from "@/components/(editor)";

export default function Editor() {
  const [values, setValues] = useState<EditOptionValues>({
    saturate: 1,
    contrast: 1,
    exposure: 1,
    maxSize: 1,
    scale: 1,
    type: 0,
  });

  return (
    <StackM {...layoutChildMotionProps} direction="row" sx={{ height: 1 }}>
      <BoxM variants={yScaleVar} sx={{ width: 0.25, height: 1 }}>
        <EditOptions
          values={values}
          onChange={(type, val) =>
            setValues((prev) => ({ ...prev, [type]: val }))
          }
        />
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
