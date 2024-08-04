import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "books",
};

import { ExploreForm } from "@/components/(explore)";
import { BoxM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";

export default function EditPage({
  params: { exploreId },
}: {
  params: { exploreId: string };
}) {
  return (
    <BoxM
      {...layoutChildMotionProps()}
      sx={{ py: 3, px: { xs: 2, sm: 4, md: 7 } }}
    >
      <ExploreForm />
    </BoxM>
  );
}
