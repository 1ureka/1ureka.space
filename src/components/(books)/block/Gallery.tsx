"use client";

import { type BoxProps } from "@mui/material";

import { BoxM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { Badge, Button, Illustration } from "@/components/(books)";
import { useBooksGallery } from "@/hooks";

const containerSx: BoxProps["sx"] = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 2.5,
  pt: 5,
  pb: 7,
  px: 9,
  height: "fit-content",
};

const itemSx: BoxProps["sx"] = {
  width: 1,
  aspectRatio: 16 / 9,
};

export default function Gallery({
  imagesList,
}: {
  imagesList: { name: string; group: string }[];
}) {
  const { imagesByGroup, imagesCount, isGroupExpanded } =
    useBooksGallery(imagesList);

  const groupEntries = Object.entries(imagesByGroup);
  const stagger = 0.3 / (imagesCount ?? 1);

  return (
    <BoxM sx={containerSx} {...layoutChildMotionProps({ stagger })}>
      {groupEntries.map(([group, names]) =>
        isGroupExpanded(group) ? (
          names.map((name) => (
            <BoxM key={name} variants={yScaleVar} layout sx={itemSx}>
              <Button group={group} name={name} sx={{ width: 1, height: 1 }}>
                <Illustration group={group} thumbnailId={name} />
              </Button>
            </BoxM>
          ))
        ) : (
          <BoxM key={names[0]} variants={yScaleVar} layout sx={itemSx}>
            <Button group={group} name={names[0]} sx={{ width: 1, height: 1 }}>
              <Badge number={names.length}>
                <Illustration group={group} thumbnailId={names[0]} />
              </Badge>
            </Button>
          </BoxM>
        )
      )}
    </BoxM>
  );
}
