import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "files",
};

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BoxM } from "@/components/Motion";
import { createStaggerVar } from "@/components/MotionProps";

const containerSx = {
  position: "relative",
  py: 3,
  px: { xs: 2, sm: 7 },

  // 不知底下這個為何可以讓內部子元素的minWidth與overflowX: "auto"生效
  // 是與Y無關的overflowX喔! 有夠詭異的，CSS真棒
  overflowY: "hidden",
};

export default async function FilesContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userId = session?.user.id;
  const expectedUserId = process.env.ALLOWED_USER;

  if (!userId || !expectedUserId || JSON.stringify(userId) !== expectedUserId) {
    redirect("/unAuth");
  }

  return (
    <BoxM sx={containerSx} {...createStaggerVar()}>
      {children}
    </BoxM>
  );
}

export const dynamic = "force-dynamic";
