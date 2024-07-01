import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { redirect } from "next/navigation";
import { Paper } from "@mui/material";

import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { Options, OptionsF } from "@/components/(files)";
import { Alert } from "@/components/(books)";

export default function ShelfContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = false; // TODO: check email
  if (!session) {
    return (
      <StackM
        direction="row"
        sx={{ position: "relative", py: 7, px: 9 }}
        {...layoutChildMotionProps({ stagger: 0.375 })}
      >
        <OptionsF />

        <BoxM
          variants={yScaleVar}
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Paper elevation={3}>
            <Alert sx={{ position: "relative" }} animated={false} />
          </Paper>
        </BoxM>
      </StackM>
    );
  }

  const { category } = searchParams;
  if (category !== "scene" && category !== "props") {
    redirect("/files?category=scene");
  }

  return (
    <StackM direction="row" sx={{ py: 7, px: 9 }} {...layoutChildMotionProps()}>
      <Options category={category} />
    </StackM>
  );
}
