"use client";

import type { ImageMetadataWithIndex } from "@/data/type";
import { useFilesPagination } from "@/hooks";
import { TablePaginationM } from "@/components/Motion";

export default function TableFooter({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  const PaginationProps = useFilesPagination(metadataList);

  return (
    <TablePaginationM
      rowsPerPageOptions={[5, 10, 20]}
      component="div"
      showFirstButton
      showLastButton
      {...PaginationProps}
      layout
    />
  );
}
