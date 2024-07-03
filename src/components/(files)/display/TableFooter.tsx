"use client";

import { TablePagination } from "@mui/material";
import type { ImageMetadataWithIndex } from "@/data/type";
import { useFilesPagination } from "@/hooks";

export default function TableFooter({
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
