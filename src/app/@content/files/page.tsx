import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { redirect } from "next/navigation";
import { getSortedMetadata } from "@/data/table";

import { Options, OptionsF, TableF, Alert } from "@/components/(files)";
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

  const session = false; // TODO: check email
  if (!session) {
    return (
      <StackM
        direction="row"
        sx={{ position: "relative", py: 7, px: 9 }}
        spacing={8}
        {...layoutChildMotionProps({ stagger: 0.375 })}
      >
        <OptionsF />
        <TableF sx={{ flexGrow: 1 }} count={metadataList.length} />
        <Alert />
      </StackM>
    );
  }

  return (
    <StackM direction="row" sx={{ py: 7, px: 9 }} {...layoutChildMotionProps()}>
      <Options category={category} />
    </StackM>
  );
}
