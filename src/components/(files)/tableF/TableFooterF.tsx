"use client";

import { TablePagination } from "@mui/material";

export function TableFooterF({ count }: { count: number }) {
  return (
    <TablePagination
      component="div"
      count={count}
      page={0}
      rowsPerPage={5}
      onPageChange={() => {}}
      onRowsPerPageChange={() => {}}
      showFirstButton
      showLastButton
      disabled
    />
  );
}
