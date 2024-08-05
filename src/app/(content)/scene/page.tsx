import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "scene",
};

import { Gallery, Accordion } from "@/components/(books)";
import { Carousels } from "@/components/(carousels)";
import { getSortedMetadata } from "@/data/table";

export default async function PropsContent() {
  const metadataList = await getSortedMetadata("scene");

  return (
    <>
      <Accordion />
      <Gallery metadataList={metadataList} />
      <Carousels metadataList={metadataList} />
    </>
  );
}

export const dynamic = "force-dynamic";
