"use client";

import { useRecoilState } from "recoil";
import type { CheckboxProps as MuiCheckBoxProps } from "@mui/material";
import type { TablePaginationProps } from "@mui/material";

import { FILES_ORDER, FILES_ORDER_BY, FILES_SELECTED } from "@/context/store";
import { FILES_CURRENT_PAGE, FILES_ROWS_PER_PAGE } from "@/context/store";

import type { FilesTableCol } from "@/context/store";
import type { ImageMetadataWithIndex } from "@/data/table";

/**
 * 管理排序狀態、全選功能，並返回控制全選框和排序標籤的Props。
 * @returns 一個包含以下屬性的物件：
 *   - CheckboxProps: 控制全選 checkbox 的屬性。
 *   - SortLabelProps: 生成排序標籤屬性的函數。
 */
export const useFilesHead = (metadataList: ImageMetadataWithIndex[]) => {
  const [order, setOrder] = useRecoilState(FILES_ORDER);
  const [orderBy, setOrderBy] = useRecoilState(FILES_ORDER_BY);

  const createSortHandler = (column: FilesTableCol) => () => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const [selected, setSelected] = useRecoilState(FILES_SELECTED);
  const selectedCount = selected.length;
  const totalCount = metadataList.length;

  const handleSelectAllClick: MuiCheckBoxProps["onChange"] = (e) => {
    if (e.target.checked) {
      setSelected(metadataList.map(({ name }) => name));
    } else {
      setSelected([]);
    }
  };

  const CheckboxProps = {
    onChange: handleSelectAllClick,
    indeterminate: selectedCount > 0 && selectedCount < totalCount,
    checked: totalCount > 0 && selectedCount === totalCount,
  };

  const SortLabelProps = (id: FilesTableCol) => ({
    onClick: createSortHandler(id),
    active: orderBy === id,
    direction: orderBy === id ? order : "asc",
  });

  return { CheckboxProps, SortLabelProps };
};

/**
 * 負責管理當前頁碼和每頁顯示的行數，並返回控制分頁組件的屬性。
 */
export const useFilesPagination = (metadataList: ImageMetadataWithIndex[]) => {
  const [page, setPage] = useRecoilState(FILES_CURRENT_PAGE);
  const [perPage, setPerPage] = useRecoilState(FILES_ROWS_PER_PAGE);

  const handleChangePage: TablePaginationProps["onPageChange"] = (
    _,
    newPage
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage: TablePaginationProps["onRowsPerPageChange"] = (
    e
  ) => {
    setPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const PaginationProps = {
    count: metadataList.length,
    page: page,
    rowsPerPage: perPage,
    onPageChange: handleChangePage,
    onRowsPerPageChange: handleChangeRowsPerPage,
  };

  return PaginationProps;
};
