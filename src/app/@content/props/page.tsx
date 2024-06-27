import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "books",
};

import { BoxM } from "@/components/Motion";
import type { BoxProps } from "@mui/material";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { Illustration, Skeleton } from "@/components/(books)";
import { Suspense } from "react";

const containerSx: BoxProps["sx"] = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 1.75,
  pt: 5,
  pb: 7,
  px: 9,
};

export default async function Props({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const isExpanded = searchParams.isExpanded === "true";

  type ImageListItem = { name: string; group: string };
  const imageList: ImageListItem[] = []; // TODO: fetch from index

  type GroupLists = { [group: string]: string[] };
  const groupLists: GroupLists = imageList.reduce(
    (acc: GroupLists, curr: ImageListItem) => {
      acc[curr.group] = acc[curr.group] || [];
      acc[curr.group].push(curr.name);

      return acc;
    },
    {}
  );

  Object.keys(groupLists).forEach((g) => groupLists[g].sort());

  if (!isExpanded) {
    return (
      <BoxM
        sx={containerSx}
        {...layoutChildMotionProps({ stagger: 0.3 / imageList.length ?? 1 })}
      >
        {Object.entries(groupLists).map(([group, list]) => {
          const name = list[0];
          return (
            <Suspense fallback={<Skeleton />}>
              <Illustration category={"props"} name={name} group={group} />
            </Suspense>
          );
        })}
      </BoxM>
    );
  } else {
    return (
      <BoxM
        sx={containerSx}
        {...layoutChildMotionProps({ stagger: 0.3 / imageList.length ?? 1 })}
      >
        {imageList.map(({ name, group }) => {
          return (
            <Suspense fallback={<Skeleton />}>
              <Illustration category={"props"} name={name} group={group} />
            </Suspense>
          );
        })}
      </BoxM>
    );
  }
}
