"use client";

import { useParams } from "next/navigation";

/**
 * 根據 slug 參數取得當前索引，並確保其在合法範圍內，若不合法則回傳預設值 0。
 */
export function useExploreIndex(total: number) {
  const index = 0;
  const params = useParams() as { [key: string]: string };

  if (!params || !params.slug) return index;

  const slug = params.slug;
  const num = parseInt(slug, 10);

  if (!Number.isSafeInteger(num) || num < 0 || num >= total) return index;

  return num;
}
