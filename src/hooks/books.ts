"use client";

import { useEffect, useState } from "react";
import { type AnimationDefinition, useMotionValue } from "framer-motion";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BOOKS_IS_EXPANDED, BOOKS_SELECT_GROUP } from "@/context/store";
import { BOOKS_CAROUSELS } from "@/context/store";

import type { ImageMetadataWithIndex } from "@/data/type";

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

  const isGroupExpanded = (g: string) =>
    isExpanded || g === selectGroup || metadataListByGroup[g].length === 1;

  return { metadataListByGroup, count, isGroupExpanded };
};

/**
 * 用於處理圖片或組別點擊事件。
 * @returns 點擊處理函式。
 */
export const useBooksButtonHandler = (
  type: "group" | "image",
  { group, index }: ImageMetadataWithIndex
) => {
  const setCarousels = useSetRecoilState(BOOKS_CAROUSELS);
  const setSelectGroup = useSetRecoilState(BOOKS_SELECT_GROUP);

  return type === "image"
    ? () => setCarousels(index)
    : () => setSelectGroup(group);
};

/**
 * 用於管理書籍輪播 (carousel) 的狀態和互動。
 * @returns 包含以下屬性：
 *   * `CarouselsProps` - 傳遞給輪播组件的 props，處理右鍵選單、動畫開始和滑鼠滾輪事件。
 *   * `open` - 指示輪播是否打開的布林值。
 *   * `pointerEvents` - 控制輪播是否響應指標事件的 MotionValue。
 */
export const useCarousels = (metadataList: ImageMetadataWithIndex[]) => {
  const pointerEvents = useMotionValue("");
  const listLength = metadataList.length;

  const [index, setIndex] = useRecoilState(BOOKS_CAROUSELS);
  const open = index >= 0 && index < listLength;

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
    open,
    pointerEvents,
  };
};

/**
 * 用於管理書籍輪播 (carousel) 的當前顯示索引。
 * @returns 要顯示的書籍索引（若關閉時會自動設定回 1）。
 */
export const useCarouselIndex = (metadataList: ImageMetadataWithIndex[]) => {
  const listLength = metadataList.length;
  const index = useRecoilValue(BOOKS_CAROUSELS);
  const open = index >= 0 && index < listLength;
  const indexToShow = open ? index : 0;

  return indexToShow;
};

type n = number;
type FilterString = `saturate(${n}) contrast(${n}) brightness(${n})`;
const defaultFilter: FilterString = "saturate(1) contrast(1) brightness(1)";

const isFilterString = (filter: string): filter is FilterString => {
  return /^saturate\(\d+(\.\d+)?\) contrast\(\d+(\.\d+)?\) brightness\(\d+(\.\d+)?\)$/.test(
    filter
  );
};

const getSave = () => {
  if (typeof window === "undefined") return defaultFilter;

  const CSSFilterString = localStorage.getItem(`imageFilter`);
  if (CSSFilterString && isFilterString(CSSFilterString))
    return CSSFilterString;

  return defaultFilter;
};

const parseFilter = (filter: FilterString) => {
  const [s, c, e] = filter.split(" ");
  return {
    saturation: Number(s.match(/\d+(\.\d+)?/)?.[0] ?? 1),
    contrast: Number(c.match(/\d+(\.\d+)?/)?.[0] ?? 1),
    exposure: Number(e.match(/\d+(\.\d+)?/)?.[0] ?? 1),
  };
};

/**
 * 用於管理書籍畫廊的圖片濾鏡效果。
 * @returns 包含以下屬性：
 *  `filter` - 當前的濾鏡效果字串
 *  `createSliderHandler` - 用於處理滑桿事件的函式。
 */
export const useBooksFilter = () => {
  const [filter, setFilter] = useState(getSave());

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "imageFilterCSS";
    style.innerHTML = `:where(#Gallery, #Carousels) img{ filter: ${filter} }`;
    document.head.appendChild(style);

    return () => {
      const style = document.getElementById("imageFilterCSS");
      if (style) document.head.removeChild(style);
    };
  }, [filter]);

  const createSliderHandler =
    (type: "saturation" | "contrast" | "exposure") =>
    (_: Event, val: number) => {
      setFilter((prev) => {
        const filter = parseFilter(prev);
        filter[type] = val;

        const FilterString: FilterString = `saturate(${filter.saturation}) contrast(${filter.contrast}) brightness(${filter.exposure})`;
        localStorage.setItem(`imageFilter`, FilterString);
        return FilterString;
      });
    };

  return { filter: parseFilter(filter), createSliderHandler };
};
