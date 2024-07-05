import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { redirect } from "next/navigation";
import { getSortedMetadata } from "@/data/table";

import { Table, UnAuthTable, UploadForm } from "@/components/(files)";
import { BoxM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";

export default async function FilesContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams.category ?? "scene";
  if (category !== "scene" && category !== "props") {
    redirect("/files?category=scene");
  }

  // TODO: get right category
  const metadataList = await getSortedMetadata("props");
  const session = true; // TODO: check email

  return (
    <BoxM
      sx={{ position: "relative", py: 3, px: 7 }}
      {...layoutChildMotionProps()}
    >
      {session ? <Table metadataList={metadataList} /> : <UnAuthTable />}
      {session && <UploadForm names={metadataList.map(({ name }) => name)} />}
    </BoxM>
  );
}
