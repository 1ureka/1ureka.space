"use client";
import { TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Table, TableCell, TableContainer } from "@mui/material";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { Button, Checkbox } from "@mui/material";

import { TableRow as TableRowM } from "..";
import { PaperM, TableBodyM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

import { useRecoilState, useRecoilValue } from "recoil";
import { EDITOR_ORDER, EDITOR_ORDERED_FILES } from "@/context/store";

import { useEditorDisplay, useEditorSelection } from "@/hooks";
import { useEditorConversion } from "@/hooks";

export default function EditTable() {
  const [order, setOrder] = useRecoilState(EDITOR_ORDER);
  const handleSetOrder = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const { handleSelectAll, handleSelect } = useEditorSelection();
  const { handleDisplay } = useEditorDisplay();
  const { handleConvert, loading } = useEditorConversion();

  const orderedFiles = useRecoilValue(EDITOR_ORDERED_FILES);
  const numAll = orderedFiles.length;
  const numSelected = orderedFiles.filter(({ selected }) => selected).length;

  return (
    <PaperM variants={yScaleVar} sx={{ borderRadius: 2, overflowX: "hidden" }}>
      <TableContainer sx={{ overflowX: "hidden", minHeight: 335 }}>
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < numAll}
                  checked={numAll > 0 && numSelected === numAll}
                  onChange={handleSelectAll}
                  size="small"
                />
              </TableCell>

              <TableCell align="center" padding="none" sortDirection={order}>
                <TableSortLabel
                  active
                  direction={order}
                  onClick={handleSetOrder}
                >
                  File name
                </TableSortLabel>
              </TableCell>

              <TableCell padding="checkbox" />
            </TableRow>
          </TableHead>

          <TableBodyM
            variants={{
              animate: {
                transition: {
                  delayChildren: 0.15,
                  staggerChildren: 0.5 / numAll,
                },
              },
            }}
          >
            {orderedFiles.map(({ file, selected, display }, i) => (
              <TableRowM
                key={file.name}
                i={i}
                name={file.name}
                isSelected={selected}
                isDisplay={display}
                onSelect={() => handleSelect(file.name)}
                onClick={() => handleDisplay(file.name)}
              />
            ))}
          </TableBodyM>
        </Table>
      </TableContainer>

      <Stack direction="row" sx={{ alignItems: "center", pl: 2, pr: 1, py: 1 }}>
        <Typography sx={{ flex: "1" }} component="div">
          {numSelected} selected
        </Typography>

        <Button
          disabled={numSelected === 0 || loading}
          variant="contained"
          onClick={handleConvert}
        >
          Convert
          {loading && (
            <CircularProgress size={20} sx={{ position: "absolute" }} />
          )}
        </Button>
      </Stack>
    </PaperM>
  );
}
