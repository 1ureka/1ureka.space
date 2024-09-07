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

/**
 * 生成偽隨機陣列，根據種子、長度、關鍵字
 * 若關鍵字為字串陣列或不是兩個數字的數字陣列，則生成對應關鍵字的隨機索引陣列
 * 若關鍵字為兩個數字的數字陣列，則生成對應範圍的隨機數字陣列
 */
export function generatePRNGArray<T extends string | number>(
  seed: number,
  length: number,
  keywords: T[]
): T[] {
  if (keywords.every((e) => typeof e === "string") || keywords.length !== 2) {
    const generate = createPRNG(seed);
    const emptys = Array(length).fill(null);
    const random01 = emptys.map(() => generate());

    const randomIndexes = random01.map((value) =>
      Math.floor(value * keywords.length)
    );
    return randomIndexes.map((index) => keywords[index]) as T[];
  } else {
    const generate = createPRNG(seed);
    const emptys = Array(length).fill(null);
    const random01 = emptys.map(() => generate());

    const [min, max] = keywords;
    if (typeof min !== "number" || typeof max !== "number") throw new Error("");
    const randomNumbers = random01.map((value) => value * (max - min) + min);
    return randomNumbers as T[];
  }
}

/**
 * 將陣列依照指定種子利用偽隨機排序
 */
export function sortArrayByPRNG<T>(array: T[], seed: number): T[] {
  const generate = createPRNG(seed);
  const emptys = Array(array.length).fill(null);
  const random01 = emptys.map(() => generate());

  const randomIndexes = random01.map((value) => value * array.length);
  return (
    array
      // 準備一個物件陣列，包含原始物件與隨機權重
      .map((item, i) => ({ item, randomWeight: randomIndexes[i] }))
      // 依照隨機權重排序
      .toSorted((a, b) => a.randomWeight - b.randomWeight)
      // 取出原始物件
      .map(({ item }) => item)
  );
}

/**
 * 緊固數字至指定範圍
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * 將數值陣列映射到指定範圍，並選擇是否離散化
 */
export function mapArrayToRange(
  array: number[],
  range: [number, number],
  isDiscrete = false
) {
  const [min, max] = range;
  const arrayMax = Math.max(...array);
  const arrayMin = Math.min(...array);
  const arrayRange = arrayMax - arrayMin;
  const rangeLength = max - min;
  const ratio = rangeLength / arrayRange;

  const output = array.map((num) => (num - arrayMin) * ratio + min);
  return isDiscrete ? output.map(Math.round) : output;
}

/**
 * 將數值陣列做極化處理，利用次方運算中，小於1的數字次方後會變小，反之則變大的特性
 * 其中exp為次方數，offset為偏移量(-1 ~ 1)
 */
export function polarizeArray(array: number[], exp = 2, offset = 0) {
  if (Number.isNaN(exp)) return array;
  if (offset < -1) offset = -1;
  if (offset > 1) offset = 1;

  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min;

  // 先將數值標準化(0 ~ 1)
  const normalizedArray = array.map((value) => (value - min) / range);
  // 根據偏移量調整數值
  const offsetArray = normalizedArray.map((value) =>
    clamp(value + offset, 0, 1)
  );
  // 轉換成(0 ~ 2)，因為小於1的數字次方後會變小，反之則變大
  const array02 = offsetArray.map((value) => value * 2);

  const cb = (value: number) => value ** exp;
  const pollarizedArray = array02.map(cb);
  const output = mapArrayToRange(pollarizedArray, [min, max]);

  return output;
}

/**
 * 實現 Single Flight 模式，用於限制同時只能執行一個相同的異步操作，並共享它的結果。
 */
export class SingleFlight {
  private _inFlight: Promise<unknown> | null = null;

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this._inFlight === null) {
      this._inFlight = (async () => {
        try {
          return await fn();
        } finally {
          this._inFlight = null;
        }
      })();
    }
    return this._inFlight as Promise<T>;
  }
}
