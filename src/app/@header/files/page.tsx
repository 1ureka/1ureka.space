import { auth } from "@/auth";
import { Typography } from "@mui/material";

import { Options } from "@/components/(files)";
import { BoxM, StackM, DividerM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";

export default async function Header({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { category } = searchParams;
  const isValidCategory = category === "scene" || category === "props";

  const session = await auth();
  const isAuth =
    !!session && JSON.stringify(session.user.id) === process.env.ALLOWED_USER;

  if (!isAuth) {
    return null;
  }

  return (
    <StackM
      {...layoutChildMotionProps()}
      direction="row"
      alignItems="flex-end"
      flexWrap={{ xs: "wrap", sm: "nowrap" }}
      gap={3}
      sx={{ px: { xs: 3, sm: 9 }, py: 3, height: "fit-content" }}
    >
      <BoxM variants={yScaleVar}>
        <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
          File Shelf
        </Typography>
      </BoxM>

      <DividerM variants={yScaleVar} orientation="vertical" flexItem />

      <Options
        category={isValidCategory ? category : "scene"}
        sx={{ flexGrow: 1 }}
      />
    </StackM>
  );
}
