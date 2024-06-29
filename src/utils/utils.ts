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
