import { validateSession } from "@/auth";
import { redirect } from "next/navigation";
import { getSortedMetadata } from "@/data/metadata";

import { DeleteForm, UploadForm } from "@/components/(files)/form";
import { ModifyForm, VerifyForm } from "@/components/(files)/form";
import Table from "@/components/(files)/Table";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await validateSession();

  const form = searchParams.form;
  const category = searchParams.category ?? "scene";
  if (category !== "scene" && category !== "props") {
    redirect("/files/images?category=scene");
  }

  const metadataList = await getSortedMetadata(category);

  return (
    <>
      <Table metadataList={metadataList} />
      <UploadForm
        open={form === "upload"}
        closeHref={{ pathname: "/files/images", query: { category } }}
        names={metadataList.map(({ name }) => name)}
      />
      <DeleteForm
        open={form === "delete"}
        closeHref={{ pathname: "/files/images", query: { category } }}
        metadataList={metadataList}
      />
      <ModifyForm
        open={form === "modify"}
        closeHref={{ pathname: "/files/images", query: { category } }}
        metadataList={metadataList}
      />
      <VerifyForm
        open={form === "verify"}
        closeHref={{ pathname: "/files/images", query: { category } }}
      />
    </>
  );
}
