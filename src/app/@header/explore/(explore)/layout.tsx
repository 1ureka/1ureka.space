import { DividerM, StackM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar } from "@/components/MotionProps";

import { CreateButton, TitleBox } from "@/components/(explore)";
import { Carousels, Indicator } from "@/components/(explore)";

export default function ExploreHeaderLayout(_: { children: React.ReactNode }) {
  return (
    <StackM
      {...layoutChildMotionProps()}
      direction={{ sm: "row" }}
      alignItems={{ sm: "flex-end" }}
      gap={{ xs: 1, sm: 3 }}
      sx={{ py: 3, px: { xs: 2, sm: 7 } }}
    >
      <TitleBox />
      <DividerM variants={yScaleVar} orientation="vertical" flexItem />

      <Carousels amount={10} sx={{ flexGrow: 1 }} />
      <Indicator amount={10} />
      <DividerM variants={yScaleVar} orientation="vertical" flexItem />

      <CreateButton />
    </StackM>
  );
}
