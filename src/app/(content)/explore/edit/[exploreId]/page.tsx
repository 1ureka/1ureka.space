import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "edit explore",
};

import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

import { ExploreForm } from "@/components/(explore)";
import { BoxM } from "@/components/Motion";
import { createStaggerVar } from "@/components/MotionProps";
import { getSortedMetadata } from "@/data/table";

export default async function EditPage({
  params: { exploreId },
}: {
  params: { exploreId: unknown };
}) {
  if (typeof exploreId !== "string") {
    notFound();
  }

  const session = await auth();
  const isAuth =
    !!session && JSON.stringify(session.user.id) === process.env.ALLOWED_USER;

  if (!isAuth) {
    redirect("/unAuth");
  }

  const metadataList = await getSortedMetadata("scene");

  return (
    <BoxM {...createStaggerVar()} sx={{ py: 3, px: { xs: 2, sm: 4, md: 7 } }}>
      <ExploreForm metadataList={metadataList} />
    </BoxM>
  );
}
