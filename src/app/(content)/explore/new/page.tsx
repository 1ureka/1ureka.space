import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "create explore",
};

import { validateUserSession } from "@/auth";
import { getSortedMetadata } from "@/data/metadata";

import { ExploreForm } from "@/components/(explore)";
import { BoxM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";

export default async function Page() {
  await validateUserSession();

  const metadataList = await getSortedMetadata("scene");

  return (
    <BoxM {...createMotionProps()} sx={{ height: 1 }}>
      <ExploreForm metadataList={metadataList} />
    </BoxM>
  );
}
