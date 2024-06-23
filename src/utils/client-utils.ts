"use client";

/** 延遲執行的 Promise 函式，用於等待一定的時間。 */
export function delay(ms: number) {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    function frame(time: number) {
      if (time - start >= ms) {
        resolve();
      } else {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  });
}

/** 使用 async/await 解碼圖片，如果解碼失敗，將進行重試直到成功。*/
export async function decode(
  image: HTMLImageElement,
  attempt = 0
): Promise<void> {
  try {
    await image.decode();
  } catch (error) {
    if (attempt < 1000) {
      await decode(image, attempt + 1);
    } else {
      throw new Error(`Reached maximum decode attempts (1000)`);
    }
  }
}

/** 獲取 Blob 或 File 的dataUrl。*/
export function blobGetDataUrl(blob: Blob | File) {
  return new Promise<string | ArrayBuffer | null>((resolve) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => resolve(target ? target.result : null);
    reader.readAsDataURL(blob);
  });
}

/** 創建包含飽和度、對比度和曝光度的 CSS 濾鏡字串。 */
export function createFilter({
  saturate,
  contrast,
  exposure,
}: {
  saturate: number;
  contrast: number;
  exposure: number;
}): string {
  const filters = [
    saturate !== 1 ? `saturate(${saturate})` : "",
    contrast !== 1 ? `contrast(${contrast})` : "",
    exposure !== 1 ? `brightness(${exposure})` : "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return filters;
}
