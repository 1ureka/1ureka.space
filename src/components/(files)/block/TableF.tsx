import { TableHeaderF, TableHeadF, TableBodyF, TableFooter } from "..";
import { PaperM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

import { Table, TableContainer } from "@mui/material";
import type { PaperProps } from "@mui/material";

const containerSx = {
  borderRadius: 2,
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "divider",
  height: "fit-content",
} as const;

export default function TableF({
  sx,
  count,
}: {
  sx?: PaperProps["sx"];
  count: number;
}) {
  return (
    <PaperM variants={yScaleVar} sx={{ ...containerSx, ...sx }} elevation={1}>
      <TableHeaderF />

      <TableContainer>
        <Table sx={{ minWidth: 300, overflow: "hidden" }}>
          <TableHeadF />
          <TableBodyF />
        </Table>
      </TableContainer>

      <TableFooter count={count} />
    </PaperM>
  );
}
