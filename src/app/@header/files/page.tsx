import { Divider, Typography } from "@mui/material";
import { Alert, Options } from "@/components/(files)";

import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";

export default function Header({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { category } = searchParams;
  const isValidCategory = category === "scene" || category === "props";

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

      {session ? (
        <Options
          category={isValidCategory ? category : "scene"}
          sx={{ flexGrow: 1 }}
        />
      ) : (
        <Alert />
      )}
    </StackM>
  );
}
