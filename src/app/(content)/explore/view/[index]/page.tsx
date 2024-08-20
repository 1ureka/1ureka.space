import { isValidIndex } from "@/utils/utils";
import { delay } from "@/utils/server-utils";
import { notFound } from "next/navigation";

import { Skeleton } from "@mui/material";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";
import { validateUserSession } from "@/auth";

export default async function Page({
  params: { index: indexString },
}: // searchParams,
{
  params: { index: unknown };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await validateUserSession({ isRedirect: false });

  if (!session) return null;

  const index = isValidIndex(indexString, 10);
  if (index === -1) notFound();

  await delay(Math.random() * 2000);

  return (
    <BoxM
      variants={createMotionVar({ from: { scale: 1, y: 0 } })}
      sx={{ height: 1 }}
    >
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ height: 1, width: 1 }}
      />
    </BoxM>
  );
}
