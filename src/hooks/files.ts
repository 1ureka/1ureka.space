"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import type { CheckboxProps as MuiCheckBoxProps } from "@mui/material";
import type { TablePaginationProps } from "@mui/material";

import { FILES_ORDER, FILES_ORDER_BY, FILES_SELECTED } from "@/context/store";
import { FILES_CURRENT_PAGE, FILES_ROWS_PER_PAGE } from "@/context/store";
import { comparator, toggleStringInArray } from "@/utils/utils";

import type { FilesTableCol } from "@/context/store";
import type { ImageMetadataWithIndex } from "@/data/type";

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

/**
 * 負責在Category改變時，將全局狀態重置
 */
export const useFilesReset = () => {
  const setPage = useSetRecoilState(FILES_CURRENT_PAGE);
  const setSelected = useSetRecoilState(FILES_SELECTED);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    setPage(0);
    setSelected([]);
  }, [category, setPage, setSelected]);
};

/**
 * 這個 hook 用於獲取表格主體（body）的資料和相關狀態。
 * @returns 包含兩個屬性的物件：
 *   - `key`：由可見列的檔名組成的字串，用於表格的唯一鍵。
 *   - `visibleRows`：當前頁面可見的圖片元資料。
 */
export const useFilesBody = (metadataList: ImageMetadataWithIndex[]) => {
  const page = useRecoilValue(FILES_CURRENT_PAGE);
  const rowsPerPage = useRecoilValue(FILES_ROWS_PER_PAGE);
  const order = useRecoilValue(FILES_ORDER);
  const orderBy = useRecoilValue(FILES_ORDER_BY);

  const visibleRows = useMemo(
    () =>
      metadataList
        .toSorted(comparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [metadataList, order, orderBy, page, rowsPerPage]
  );

  const key = visibleRows.map(({ name }) => name).join("");
  return { key, visibleRows };
};

/**
 * 這個 hook 用於管理表格行的選擇狀態，並提供行和複選框的屬性。
 * @returns
 *   - `TableRowProps`：一個函式，接受檔名參數，返回表格行所需的屬性，包括 `onClick` 和 `selected`。
 *   - `CheckBoxProps`：一個函式，接受檔名參數，返回複選框所需的 `checked` 屬性。
 */
export const useFilesRows = () => {
  const [selected, setSelected] = useRecoilState(FILES_SELECTED);

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const handleClick = (name: string) => () =>
    setSelected((prev) => toggleStringInArray(prev, name));

  const TableRowProps = (name: string) => ({
    onClick: handleClick(name),
    selected: isSelected(name),
  });

  const CheckBoxProps = (name: string) => ({ checked: isSelected(name) });

  return { TableRowProps, CheckBoxProps };
};
