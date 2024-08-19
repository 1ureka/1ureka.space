import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "edit explore",
};

import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

import { ExploreForm } from "@/components/(explore)";
import { BoxM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";
import { getSortedMetadata } from "@/data/table";

type PageProps = { params: { exploreId: unknown } };

export default async function EditPage({ params: { exploreId } }: PageProps) {
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
    <BoxM {...createMotionProps()} sx={{ height: 1 }}>
      <ExploreForm metadataList={metadataList} />
    </BoxM>
  );
}
