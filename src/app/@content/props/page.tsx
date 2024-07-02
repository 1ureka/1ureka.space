import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "books",
};

import { Carousels, Gallery } from "@/components/(books)";
import { getSortedMetadata } from "@/data/table";

export default async function PropsContent() {
  const metadataList = await getSortedMetadata("props");
  const isAuth = false; // TODO

  return (
    <>
      <Gallery metadataList={metadataList} />
      <Carousels metadataList={metadataList} isAuth={isAuth} />
    </>
  );
}

export const dynamic = "force-dynamic";
