import { auth } from "@/auth";
import { Stack, Typography } from "@mui/material";

import { CategoryToggle, RefreshButton } from "@/components/(files)";
import { BoxM, StackM, DividerM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";

export default async function Header({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userId = session?.user.id;
  const expectedUserId = process.env.ALLOWED_USER;
  if (!userId || !expectedUserId || JSON.stringify(userId) !== expectedUserId) {
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

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        flexWrap="wrap"
        gap={{ xs: 3, sm: 5.5 }}
        sx={{ flexGrow: 1 }}
      >
        <Stack direction="row" flexWrap="wrap" gap={{ xs: 3, sm: 5.5, md: 8 }}>
          <StackM variants={yScaleVar} spacing={1}>
            <Typography variant="subtitle2">CATEGORY:</Typography>

            <CategoryToggle />
          </StackM>

          {children}
        </Stack>

        <RefreshButton />
      </Stack>
    </StackM>
  );
}
