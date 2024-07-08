import { BoxM, SkeletonM, TableRowM } from "@/components/Motion";
import { xVar, yScaleVar } from "@/components/MotionProps";
import { UnAuthFooter } from "..";

import { Checkbox, Stack } from "@mui/material";
import { TableBody, TableCell, TableContainer } from "@mui/material";
import { TableHead, TableRow, Table as MuiTable } from "@mui/material";

const headCells = ["File name", "Group", "Size (KB)", "Update at", "Create at"];
const datas = Array(5).fill(0);

export default function Table() {
  return (
    <BoxM variants={yScaleVar} sx={{ position: "relative" }}>
      <Stack
        direction="row"
        sx={{ p: 1.5, pl: 2.5 }}
        justifyContent="space-between"
      >
        <SkeletonM variants={yScaleVar} sx={{ width: "6rem" }} />

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <SkeletonM variants={yScaleVar} sx={{ width: "6rem" }} />
          <SkeletonM variants={yScaleVar} sx={{ width: "6rem" }} />
        </Stack>
      </Stack>

      <TableContainer>
        <MuiTable sx={{ minWidth: 300, overflow: "hidden" }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" size="small" disabled />
              </TableCell>

              {headCells.map((label, i) => (
                <TableCell
                  key={label}
                  align={i === 0 ? "left" : "right"}
                  sx={{ color: "text.secondary" }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {datas.map((_, i) => (
              <TableRowM key={i} variants={xVar}>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" size="small" disabled />
                </TableCell>
                {headCells.map((val, i) => (
                  <TableCell key={val} align={i === 0 ? "left" : "right"}>
                    <SkeletonM variants={yScaleVar} sx={{ width: 1 }} />
                  </TableCell>
                ))}
              </TableRowM>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <UnAuthFooter />
    </BoxM>
  );
}
