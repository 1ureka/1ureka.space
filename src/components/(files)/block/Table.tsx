import { TableHeader, TableHead, TableBody, TableFooter } from "..";
import { BoxM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import { ImageMetadataWithIndex } from "@/data/table";

import { Table as MuiTable, TableContainer } from "@mui/material";
import type { PaperProps } from "@mui/material";

const containerSx = {
  borderRadius: 2,
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "divider",
  height: "fit-content",
} as const;

export default function Table({
  sx,
  metadataList,
}: {
  sx?: PaperProps["sx"];
  metadataList: ImageMetadataWithIndex[];
}) {
  return (
    <BoxM variants={yScaleVar} sx={{ ...containerSx, ...sx }}>
      <TableHeader />

      <TableContainer>
        <MuiTable sx={{ minWidth: 300, overflow: "hidden" }}>
          <TableHead metadataList={metadataList} />
          <TableBody metadataList={metadataList} />
        </MuiTable>
      </TableContainer>

      <TableFooter metadataList={metadataList} />
    </BoxM>
  );
}
