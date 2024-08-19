"use client";

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { delay } from "@/utils/client-utils";
import type { ImageMetadata } from "@/data/type";

/**
 * 用於探索頁面的表單選取搜尋功能。
 */
export function useExploreSearch(
  search: string,
  metadataList: ImageMetadata[]
) {
  const [filteredMetadataList, setFilteredMetadataList] =
    useState(metadataList);

  useEffect(() => {
    if (search === "") {
      setFilteredMetadataList(metadataList);
      return;
    }

    let current = true;
    (async () => {
      await delay(250);
      if (!current) return;
      const fuse = new Fuse(metadataList, { keys: ["name"] });
      const result = fuse.search(search);
      setFilteredMetadataList(result.map((r) => r.item));
    })();

    return () => {
      current = false;
    };
  }, [search, metadataList]);

  return filteredMetadataList;
}
