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

type ImageDimensions = { width: number; height: number };
/** 使用 async 獲取圖片的尺寸。 */
export async function getImageDimensions<T extends boolean>(
  dataUrl: string,
  isAsString: T = false as T
): Promise<T extends true ? string : ImageDimensions> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onerror = rej;
    img.onload = () => {
      const dimensions = { width: img.width, height: img.height };
      if (isAsString) {
        res(
          `${dimensions.width}px * ${dimensions.height}px` as T extends true
            ? string
            : ImageDimensions
        );
      } else {
        res(dimensions as T extends true ? string : ImageDimensions);
      }
    };
    img.src = dataUrl;
  });
}

/** 將指定的檔案名稱替換成新的副檔名。 */
export function replaceFileExtension(
  fileName: string,
  newExtension: string
): string {
  if (!fileName || !fileName.trim())
    throw new Error("File name cannot be empty.");
  if (!newExtension || !newExtension.trim().replace(".", ""))
    throw new Error("New extension must contain at least one character.");

  const lastDotIndex = fileName.lastIndexOf(".");
  if (!newExtension.startsWith(".")) newExtension = `.${newExtension}`;

  if (lastDotIndex === -1) return fileName + "." + newExtension;
  return fileName.slice(0, lastDotIndex) + newExtension;
}
