"use client";

import { useEffect } from "react";
import { type AnimationDefinition, useMotionValue } from "framer-motion";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BOOKS_IS_EXPANDED, BOOKS_SELECT_GROUP } from "@/context/store";
import { BOOKS_CAROUSELS } from "@/context/store";

import type { ImageMetadataWithIndex } from "@/data/table";

/**
 * 提供畫廊組件所需的資料與功能。
 * @returns 一個物件，包含以下屬性：
 *   - `metadataListByGroup`: 一個物件，其中鍵為組名，值為屬於該組的 metadata 物件陣列。
 *   - `count`: 畫廊中應顯示的項目數量。如果所有組都展開，則為書籍總數；如果僅展開選定的組，則為組數。
 *   - `isGroupExpanded`: 一個函式，接受組名並返回 `true`（如果組已展開）或 `false`（如果組未展開）。
 */
export const useBooksGallery = (metadataList: ImageMetadataWithIndex[]) => {
  const isExpanded = useRecoilValue(BOOKS_IS_EXPANDED);
  const [selectGroup, setSelectGroup] = useRecoilState(BOOKS_SELECT_GROUP);

  const isGroupExpanded = (g: string) => isExpanded || g === selectGroup;

  useEffect(() => {
    return () => setSelectGroup("");
  }, [setSelectGroup]);

  type MetadataListByGroup = { [group: string]: ImageMetadataWithIndex[] };
  const metadataListByGroup = metadataList.reduce(
    (acc: MetadataListByGroup, curr: ImageMetadataWithIndex) => {
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
export const useBooksButtonHandler = ({
  group,
  index,
}: ImageMetadataWithIndex) => {
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

/**
 * 用於管理書籍輪播 (carousel) 的狀態和互動。
 * @returns 包含以下屬性：
 *   * `CarouselsProps` - 傳遞給輪播组件的 props，處理右鍵選單、動畫開始和滑鼠滾輪事件。
 *   * `index` - 要顯示的書籍索引（若關閉時會自動設定回 1）。
 *   * `open` - 指示輪播是否打開的布林值。
 *   * `pointerEvents` - 控制輪播是否響應指標事件的 MotionValue。
 */
export const useCarousels = (metadataList: ImageMetadataWithIndex[]) => {
  const pointerEvents = useMotionValue("");
  const listLength = metadataList.length;

  const [index, setIndex] = useRecoilState(BOOKS_CAROUSELS);
  const open = index >= 0 && index < listLength;
  const indexToShow = open ? index : 1;

  useEffect(() => {
    setIndex(-1);
  }, [setIndex]);

  const onContextMenu: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setIndex(-1);
    pointerEvents.set("none");
  };

  const onAnimationStart = (e: AnimationDefinition) => {
    if (e === "animate") pointerEvents.set(""); // 若未完全關閉又再次打開時
  };

  const onWheel: React.WheelEventHandler = (e) => {
    const change = e.deltaY > 0 ? 1 : -1;
    setIndex((prev) => (prev + change + listLength) % listLength);
  };

  return {
    CarouselsProps: { onContextMenu, onAnimationStart, onWheel },
    index: indexToShow,
    open,
    pointerEvents,
  };
};
