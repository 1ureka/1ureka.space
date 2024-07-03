import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { redirect } from "next/navigation";
import { getSortedMetadata } from "@/data/table";

import { Options, OptionsF, TableF, Alert, Table } from "@/components/(files)";
import { StackM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";

export default async function ShelfContent({
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
    <StackM
      direction="row"
      sx={{ position: "relative", py: 7, px: 9 }}
      spacing={8}
      {...layoutChildMotionProps({ stagger: 0.375 })}
    >
      {session ? (
        <>
          <Options category={category} />
          <Table sx={{ flexGrow: 1 }} metadataList={metadataList} />
        </>
      ) : (
        <>
          <OptionsF />
          <TableF sx={{ flexGrow: 1 }} count={metadataList.length} />
          <Alert />
        </>
      )}
    </StackM>
  );
}
