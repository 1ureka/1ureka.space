"use client";

import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BOOKS_IS_EXPANDED, BOOKS_SELECT_GROUP } from "@/context/store";
import { BOOKS_CAROUSELS } from "@/context/store";

type ImageListItem = { name: string; group: string };
type GroupLists = { [group: string]: string[] };

/**
 * 用於圖庫畫廊的功能。
 * @returns 一個物件，包含以下屬性：
 * - `imagesByGroup`: 以組別為鍵，圖片名稱陣列為值的物件。
 * - `imagesCount`: 應該要顯示的圖片數量。
 * - `isGroupExpanded`: 判斷特定組別是否展開的函式。
 */
export const useBooksGallery = (imageList: ImageListItem[]) => {
  const isExpanded = useRecoilValue(BOOKS_IS_EXPANDED);
  const [selectGroup, setSelectGroup] = useRecoilState(BOOKS_SELECT_GROUP);

  const isGroupExpanded = (g: string) => isExpanded || g === selectGroup;

  useEffect(() => {
    return () => setSelectGroup("");
  }, [setSelectGroup]);

  const imagesByGroup: GroupLists = imageList.reduce(
    (acc: GroupLists, curr: ImageListItem) => {
      acc[curr.group] = acc[curr.group] || [];
      acc[curr.group].push(curr.name);

      return acc;
    },
    {}
  );

  Object.keys(imagesByGroup).forEach((g) => {
    imagesByGroup[g].sort();
  });

  const imagesCount = isExpanded
    ? imageList.length
    : Object.keys(imagesByGroup).length;

  return { imagesByGroup, imagesCount, isGroupExpanded };
};

/**
 * 用於處理圖片或組別點擊事件。
 * @returns 點擊處理函式。
 */
export const useBooksButtonHandler = ({ name, group }: ImageListItem) => {
  const isExpanded = useRecoilValue(BOOKS_IS_EXPANDED);
  const setCarousels = useSetRecoilState(BOOKS_CAROUSELS);
  const [selectGroup, setSelectGroup] = useRecoilState(BOOKS_SELECT_GROUP);

  const handleImageClick = () => {
    setCarousels(name);
  };

  const handleGroupClick = () => {
    setSelectGroup(group);
  };

  return isExpanded || selectGroup === group
    ? handleImageClick
    : handleGroupClick;
};
