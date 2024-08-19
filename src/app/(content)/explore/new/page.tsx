import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "create explore",
};

import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { ExploreForm } from "@/components/(explore)";
import { BoxM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";
import { getSortedMetadata } from "@/data/table";

export default async function CreatePage() {
  const session = await auth();
  const isAuth =
    !!session && JSON.stringify(session.user.id) === process.env.ALLOWED_USER;

  if (!isAuth) {
    redirect("/unAuth");
  }

  const metadataList = await getSortedMetadata("scene");

  return (
    <BoxM {...createMotionProps()} sx={{ height: 1 }}>
      <ExploreForm metadataList={metadataList} />
    </BoxM>
  );
}
