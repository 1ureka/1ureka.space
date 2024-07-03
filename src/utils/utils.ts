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
