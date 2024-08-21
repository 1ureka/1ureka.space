/** 計算陣列中所有數字的總和。 */
export function arraySum(numbers: number[]) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

/** 隨機排序陣列 */
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** 從陣列中移除重複元素，返回一個新陣列。 */
export function removeDuplicates<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * 產生一個比較函式，用於排序object[]，其中屬性的值可以是日期、數字、字串或 null。
 *
 * 它返回一個比較函式，可以直接傳遞給 `Array.prototype.sort` 方法使用。
 */
export function comparator<
  T extends string,
  U extends Date | number | string | null
>(order: "asc" | "desc", orderBy: T) {
  const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;

  return (a: Record<T, U>, b: Record<T, U>) => {
    const aVal = a[orderBy];
    const bVal = b[orderBy];

    if (aVal === null && bVal === null) {
      return 0;
    } else if (aVal === null) {
      return -sortOrder;
    } else if (bVal === null) {
      return sortOrder;
    }

    if (aVal instanceof Date && bVal instanceof Date) {
      return (aVal.getTime() - bVal.getTime()) * sortOrder;
    } else if (typeof aVal === "string" && typeof bVal === "string") {
      return aVal.localeCompare(bVal) * sortOrder;
    } else if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * sortOrder;
    } else {
      throw new Error(
        `Unsupported type for sorting: ${typeof aVal} and ${typeof bVal}`
      );
    }
  };
}

/**
 * 切換字串在陣列中的存在狀態：若存在則移除，若不存在則新增。
 */
export function toggleStringInArray(arr: string[], str: string): string[] {
  const set = new Set(arr);
  set.delete(str) || set.add(str);
  return Array.from(set);
}

/**
 * 檢查陣列是否不為空。
 */
export function isArrayNotEmpty<T>(arr: T[]): arr is [T, ...T[]] {
  return Array.isArray(arr) && arr.length > 0;
}

/**
 * 追踪多個異步操作的進度，並在每個操作完成時調用進度回調函數。
 */
export function trackProgress<T>(
  proms: Promise<T>[],
  progress_cb: (progress: number, done: number) => void
) {
  let d = 0;
  progress_cb(0, 0);
  for (const p of proms) {
    p.then(() => {
      d++;
      progress_cb((d * 100) / proms.length, d);
    });
  }
  return Promise.all(proms);
}

/**
 * 檢查任何值是否為有效的索引值，若是則返回索引值，否則返回 -1。
 */
export function isValidIndex(any: unknown, total: number) {
  if (typeof any !== "string" && typeof any !== "number") return -1;

  const index = parseInt(`${any}`, 10);
  if (Number.isNaN(index) || index < 0 || index >= total) return -1;

  return index;
}

/**
 * 產生一個偽隨機數生成器 (PRNG) 函數。
 */
export function createPRNG(seed: number) {
  let x = seed;

  function next() {
    x = (x * 1664525 + 1013904223) % 4294967296;
    return x / 4294967296;
  }

  return next;
}
