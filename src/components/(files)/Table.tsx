import type { ImageMetadataWithIndex } from "@/data/type";
import { Table, TableContainer } from "@mui/material";

import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

import TableHeader from "./display/TableHeader";
import TableFooter from "./display/TableFooter";
import TableHead from "./display/TableHead";
import dynamic from "next/dynamic";
const TableBody = dynamic(() => import("./display/TableBody"), { ssr: false });

export default function FileTable({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  return (
    <BoxM variants={createMotionVar()}>
      <TableHeader />

      <TableContainer>
        <Table sx={{ minWidth: 300, overflow: "hidden" }}>
          <TableHead metadataList={metadataList} />
          <TableBody metadataList={metadataList} />
        </Table>
      </TableContainer>

      <TableFooter metadataList={metadataList} />
    </BoxM>
  );
}
