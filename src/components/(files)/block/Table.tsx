import { TableHeader, TableHead, TableFooter } from "..";
import { BoxM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import type { ImageMetadataWithIndex } from "@/data/type";

import { Table as MuiTable, TableContainer } from "@mui/material";
import type { PaperProps } from "@mui/material";
import dynamic from "next/dynamic";

const TableBody = dynamic(
  () => import("..").then(({ TableBody }) => TableBody),
  { ssr: false }
);

export default function Table({
  sx,
  metadataList,
}: {
  sx?: PaperProps["sx"];
  metadataList: ImageMetadataWithIndex[];
}) {
  return (
    <BoxM variants={yScaleVar} sx={sx}>
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
