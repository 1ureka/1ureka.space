import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getSortedMetadata } from "@/data/table";

import { Table } from "@/components/(files)";
import { DeleteForm, UploadForm } from "@/components/(files)";
import { ModifyForm, VerifyForm } from "@/components/(files)";

import { BoxM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";

export default async function FilesContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const form = searchParams.form;

  const category = searchParams.category ?? "scene";
  if (category !== "scene" && category !== "props") {
    redirect("/files?category=scene");
  }

  const session = await auth();
  const isAuth =
    !!session && JSON.stringify(session.user.id) === process.env.ALLOWED_USER;

  if (!isAuth) {
    redirect("/unAuth");
  }

  const metadataList = await getSortedMetadata(category);

  return (
    <BoxM
      sx={{
        position: "relative",
        py: 3,
        px: { xs: 2, sm: 7 },

        // 不知底下這個為何可以讓內部子元素的minWidth與overflowX: "auto"生效
        // 是與Y無關的overflowX喔! 有夠詭異的，CSS真棒
        overflowY: "hidden",
      }}
      {...layoutChildMotionProps()}
    >
      <Table metadataList={metadataList} />
      <UploadForm
        open={form === "upload"}
        closeHref={{ pathname: "/files", query: { category } }}
        names={metadataList.map(({ name }) => name)}
      />
      <DeleteForm
        open={form === "delete"}
        closeHref={{ pathname: "/files", query: { category } }}
        metadataList={metadataList}
      />
      <ModifyForm
        open={form === "modify"}
        closeHref={{ pathname: "/files", query: { category } }}
        metadataList={metadataList}
      />
      <VerifyForm
        open={form === "verify"}
        closeHref={{ pathname: "/files", query: { category } }}
      />
    </BoxM>
  );
}

export const dynamic = "force-dynamic";
