import { validateUserSession } from "@/auth";
import { delay } from "@/utils/server-utils";
import { isValidIndex } from "@/utils/utils";

import { Skeleton } from "@mui/material";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";

import Block from "@/components/Block";
import { BoxM } from "@/components/Motion";
import { createMotionProps, createMotionVar } from "@/components/MotionProps";

export default async function Page({
  params: { index: indexString },
}: {
  params: { index: unknown };
}) {
  await validateUserSession();

  const index = isValidIndex(indexString, 10);
  if (index === -1) notFound();

  await delay(Math.random() * 3500);

  return (
    <BoxM
      {...createMotionProps()}
      sx={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
      }}
    >
      <BoxM
        variants={createMotionVar({ from: { y: 0, scale: 1 } })}
        sx={{ position: "absolute", inset: 0, overflow: "hidden" }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: 1, height: 1 }}
        />
      </BoxM>

      <Block sx={{ position: "absolute", inset: "auto auto 0 auto", mb: 3 }}>
        <Link href={`/explore/view/${index}`}>Back to view {index + 1}</Link>
      </Block>
    </BoxM>
  );
}
