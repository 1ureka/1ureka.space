"use client";

import { TablePagination } from "@mui/material";
import { ImageMetadataWithIndex } from "@/data/table";
import { useFilesPagination } from "@/hooks";

export function TableFooter({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  const PaginationProps = useFilesPagination(metadataList);

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20]}
      component="div"
      showFirstButton
      showLastButton
      {...PaginationProps}
    />
  );
}
