import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "edit explore",
};

import { notFound } from "next/navigation";
import { validateSession } from "@/auth";
import { getSortedMetadata } from "@/data/metadata";

import { ExploreForm } from "@/components/(explore)";
import { BoxM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";

type PageProps = { params: { exploreId: unknown } };

export default async function Page({ params: { exploreId } }: PageProps) {
  if (typeof exploreId !== "string") notFound();

  await validateSession();

  const metadataList = await getSortedMetadata("scene");

  return (
    <BoxM {...createMotionProps()} sx={{ height: 1 }}>
      <ExploreForm metadataList={metadataList} />
    </BoxM>
  );
}
