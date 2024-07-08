"use client";

import { TablePagination } from "@mui/material";

export default function Footer() {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10]}
      component="div"
      count={15}
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
