import { Divider, Typography } from "@mui/material";
import { redirect } from "next/navigation";

import { Options } from "@/components/(files)";
import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";

export default function Header({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams.category ?? "scene";
  if (category !== "scene" && category !== "props") {
    redirect("/files?category=scene");
  }

  const session = true; // TODO: check email

  return (
    <StackM
      {...layoutChildMotionProps()}
      direction="row"
      alignItems="flex-end"
      spacing={3}
      sx={{ px: 9, py: 3, height: "fit-content" }}
    >
      <BoxM variants={yScaleVar}>
        <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
          File Shelf
        </Typography>
      </BoxM>
      <BoxM variants={yScaleVar} height={"auto"} alignSelf={"stretch"}>
        <Divider orientation="vertical" />
      </BoxM>

      <Options category={category} sx={{ flexGrow: 1 }} />
      {/* 沒有session時，不呈現Options，而是呈現一個w-full alert */}
    </StackM>
  );
}
