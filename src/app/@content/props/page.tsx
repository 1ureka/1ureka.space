import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "books",
};

import { Gallery } from "@/components/(books)";
import { getImageIndex } from "@/utils/server-utils";

export default async function PropsContent() {
  const images = await getImageIndex("props");

  return <Gallery imagesList={images} />;
}

export const dynamic = "force-dynamic"; // only for test
