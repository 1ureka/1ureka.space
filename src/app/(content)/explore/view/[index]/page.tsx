import { auth } from "@/auth";
import { isValidIndex } from "@/utils/utils";
import { notFound } from "next/navigation";

import { Skeleton } from "@mui/material";
import { BoxM } from "@/components/Motion";
import { opacityVar } from "@/components/MotionProps";
import { delay } from "@/utils/server-utils";

export default async function Page({
  params: { index: indexString },
  searchParams,
}: {
  params: { index: unknown };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await delay(Math.random() * 2000);

  const index = isValidIndex(indexString, 10);
  if (index === -1) notFound();

  const session = await auth();
  const userId = JSON.stringify(session?.user.id);
  const expectedUserId = process.env.ALLOWED_USER;

  if (!userId || !expectedUserId || userId !== expectedUserId) {
    return null;
  }

  return (
    <BoxM variants={opacityVar} sx={{ height: 1 }}>
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ height: 1, width: 1 }}
      />
    </BoxM>
  );
}
