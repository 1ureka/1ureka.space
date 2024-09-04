"use client";

import { useFilesBody, useFilesRows } from "@/hooks";
import type { FilesTableCol } from "@/context/store";
import type { ImageMetadataWithIndex } from "@/data/type";

import type { TableCellProps } from "@mui/material";
import { Checkbox, TableCell } from "@mui/material";
import { TableBodyM, TableRowM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

const bodyCells: {
  id: FilesTableCol;
  align: TableCellProps["align"];
}[] = [
  { id: "name", align: "left" },
  { id: "group", align: "right" },
  { id: "size", align: "right" },
  { id: "updatedAt", align: "right" },
  { id: "createdAt", align: "right" },
] as const;

export default function TableBody({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  const { key, visibleRows } = useFilesBody(metadataList);
  const { TableRowProps, CheckBoxProps } = useFilesRows();

  const createLabel = (value: string | number | Date | null) => {
    if (value instanceof Date) {
      return value.toLocaleString();
    } else if (typeof value === "number") {
      return Math.round(value / 102.4) / 10;
    } else {
      return value;
    }
  };

  const variants = {
    animate: {
      transition: { staggerChildren: 1 / (3 * visibleRows.length) },
    },
  };

  return (
    <TableBodyM key={key} variants={variants}>
      {visibleRows.map((metadata) => (
        <TableRowM
          key={metadata.id}
          variants={createMotionVar({ from: { y: 0, x: 65, scale: 1 } })}
          hover
          tabIndex={-1}
          sx={{ cursor: "pointer" }}
          {...TableRowProps(metadata.name)}
        >
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              size="small"
              {...CheckBoxProps(metadata.name)}
            />
          </TableCell>
          {bodyCells.map(({ id, align }) => (
            <TableCell key={id} align={align}>
              {createLabel(metadata[id])}
            </TableCell>
          ))}
        </TableRowM>
      ))}
    </TableBodyM>
  );
}
