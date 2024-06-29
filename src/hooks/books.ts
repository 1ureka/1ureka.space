"use client";

import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BOOKS_IS_EXPANDED, BOOKS_SELECT_GROUP } from "@/context/store";
import { BOOKS_CAROUSELS } from "@/context/store";
import type { Metadata } from "@/data/table";

/**
 * 提供畫廊組件所需的資料與功能。
 * @returns 一個物件，包含以下屬性：
 *   - `metadataListByGroup`: 一個物件，其中鍵為組名，值為屬於該組的 metadata 物件陣列。
 *   - `count`: 畫廊中應顯示的項目數量。如果所有組都展開，則為書籍總數；如果僅展開選定的組，則為組數。
 *   - `isGroupExpanded`: 一個函式，接受組名並返回 `true`（如果組已展開）或 `false`（如果組未展開）。
 */
export const useBooksGallery = (metadataList: Metadata[]) => {
  const isExpanded = useRecoilValue(BOOKS_IS_EXPANDED);
  const [selectGroup, setSelectGroup] = useRecoilState(BOOKS_SELECT_GROUP);

  const isGroupExpanded = (g: string) => isExpanded || g === selectGroup;

  useEffect(() => {
    return () => setSelectGroup("");
  }, [setSelectGroup]);

  type MetadataListByGroup = { [group: string]: Metadata[] };
  const metadataListByGroup: MetadataListByGroup = metadataList.reduce(
    (acc: MetadataListByGroup, curr: Metadata) => {
      acc[curr.group] = acc[curr.group] || [];
      acc[curr.group].push(curr);

      return acc;
    },
    {}
  );

  const count = isExpanded
    ? metadataList.length
    : Object.keys(metadataListByGroup).length;

  return { metadataListByGroup, count, isGroupExpanded };
};

/**
 * 用於處理圖片或組別點擊事件。
 * @returns 點擊處理函式。
 */
export const useBooksButtonHandler = ({ group, index }: Metadata) => {
  const isExpanded = useRecoilValue(BOOKS_IS_EXPANDED);
  const setCarousels = useSetRecoilState(BOOKS_CAROUSELS);
  const [selectGroup, setSelectGroup] = useRecoilState(BOOKS_SELECT_GROUP);

  const handleImageClick = () => {
    setCarousels(index);
  };

  const handleGroupClick = () => {
    setSelectGroup(group);
  };

  return isExpanded || selectGroup === group
    ? handleImageClick
    : handleGroupClick;
};

export const useCarousels = () => {
  const setCarousels = useSetRecoilState(BOOKS_CAROUSELS);

  useEffect(() => {
    setCarousels(-1);
  }, [setCarousels]);
};
