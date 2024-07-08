"use client";

import type { FilesTableCol } from "@/context/store";
import type { ImageMetadataWithIndex } from "@/data/type";

import { TableCell, Checkbox, TableSortLabel } from "@mui/material";
import { TableHead as MuiTableHead } from "@mui/material";
import type { TableCellProps } from "@mui/material";
import { useFilesHead, useFilesReset } from "@/hooks";

import { TableCellM, TableRowM } from "@/components/Motion";
import { xVar } from "@/components/MotionProps";

const headCells: {
  id: FilesTableCol;
  label: string;
  align: TableCellProps["align"];
}[] = [
  { id: "name", label: "File name", align: "left" },
  { id: "group", label: "Group", align: "right" },
  { id: "size", label: "Size (KB)", align: "right" },
  { id: "updateAt", label: "Update at", align: "right" },
  { id: "createAt", label: "Create at", align: "right" },
] as const;

export default function TableHead({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  const { CheckboxProps, SortLabelProps } = useFilesHead(metadataList);
  useFilesReset();

  return (
    <MuiTableHead>
      <TableRowM variants={xVar}>
        <TableCell padding="checkbox">
          <Checkbox color="primary" size="small" {...CheckboxProps} />
        </TableCell>

        {headCells.map(({ id, label, align }) => (
          <TableCellM key={id} align={align} layout>
            <TableSortLabel {...SortLabelProps(id)}>{label}</TableSortLabel>
          </TableCellM>
        ))}
      </TableRowM>
    </MuiTableHead>
  );
}
