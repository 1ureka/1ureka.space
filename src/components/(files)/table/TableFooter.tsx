"use client";

import { TablePagination } from "@mui/material";

export function TableFooter({ count }: { count: number }) {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
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
