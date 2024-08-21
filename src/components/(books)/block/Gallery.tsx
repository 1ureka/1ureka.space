"use client";

import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";
import { Badge, Button, Illustration } from "@/components/(books)";

import type { BoxProps } from "@mui/material";
import { useBooksGallery } from "@/hooks";
import type { ImageMetadataWithIndex } from "@/data/type";

const containerSx: BoxProps["sx"] = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 2.5,
  height: "fit-content",
} as const;

function GridItem({ children }: { children: React.ReactNode }) {
  return (
    <BoxM
      variants={createMotionVar()}
      layout
      sx={{ width: 1, aspectRatio: 16 / 9 }}
    >
      {children}
    </BoxM>
  );
}

export default function Gallery({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  const { metadataListByGroup, count, isGroupExpanded } =
    useBooksGallery(metadataList);

  const groupEntries = Object.entries(metadataListByGroup);
  const staggerChildren = 1 / (count ?? 1);

  return (
    <BoxM
      id="Gallery"
      sx={containerSx}
      variants={createMotionVar({ staggerChildren })}
    >
      {groupEntries.map(([group, metadataList]) =>
        isGroupExpanded(group) ? (
          metadataList.map((metadata) => (
            <GridItem key={metadata.id}>
              <Button type="image" metadata={metadata}>
                <Illustration metadata={metadata} />
              </Button>
            </GridItem>
          ))
        ) : (
          <GridItem key={metadataList[0].id}>
            <Button type="group" metadata={metadataList[0]}>
              <Badge count={metadataList.length}>
                <Illustration metadata={metadataList[0]} />
              </Badge>
            </Button>
          </GridItem>
        )
      )}
    </BoxM>
  );
}
