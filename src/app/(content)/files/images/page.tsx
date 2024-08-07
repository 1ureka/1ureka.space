import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getSortedMetadata } from "@/data/table";

import { Table } from "@/components/(files)";
import { DeleteForm, UploadForm } from "@/components/(files)";
import { ModifyForm, VerifyForm } from "@/components/(files)";

export default async function FilesContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const userId = session?.user.id;
  const expectedUserId = process.env.ALLOWED_USER;
  if (!userId || !expectedUserId || JSON.stringify(userId) !== expectedUserId) {
    redirect("/unAuth");
  }

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
