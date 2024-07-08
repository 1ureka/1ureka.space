"use client";

import Compressor from "compressorjs";

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

/** 獲取 Blob 或 File 的dataUrl。*/
export function blobGetDataUrl(blob: Blob | File): Promise<string> {
  return new Promise((res) => {
    const reader = new FileReader();

    reader.onload = ({ target }) => {
      const result = target?.result;
      if (typeof result === "string") {
        res(result);
      } else {
        throw new Error("Failed to read blob.");
      }
    };

    reader.readAsDataURL(blob);
  });
}

/** 獲取 Blob 或 File 的高度和寬度。 */
export async function blobGetDimensions(blob: Blob) {
  try {
    const dataUrl = await blobGetDataUrl(blob);

    if (!dataUrl) throw new Error("Failed to read blob.");

    return getImageDimensions(dataUrl, false);
  } catch {
    throw new Error("Failed to read blob.");
  }
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
    saturate !== 1 ? `saturate(${saturate * 100}%)` : "",
    contrast !== 1 ? `contrast(${contrast * 100}%)` : "",
    exposure !== 1 ? `brightness(${exposure * 100}%)` : "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return filters;
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

type CompressOptions = {
  type?: string;
  scale?: number;
  maxSize?: number;
};
/** 壓縮圖片並返回 Blob。 */
export async function compressImage(file: Blob, options: CompressOptions) {
  let blob = new Blob([file], { type: file.type });

  options = options || {};
  const { type = "webp", scale = 1, maxSize = 1024 * 1024 } = options;
  const { width, height } = await blobGetDimensions(blob);

  let quality = 1.0;
  while (quality === 1.0 || blob.size > maxSize) {
    blob = await new Promise((resolve) => {
      new Compressor(blob, {
        width: width * scale,
        height: height * scale,
        mimeType: `image/${type}`,
        convertSize: Infinity,
        quality,
        success: resolve,
      });
    });

    if (type === "png") break;

    quality *= 0.9;
    if (quality < 0.05) {
      console.warn(
        `Failed to compress image below ${maxSize} bytes. Final size: ${blob.size} bytes.`
      );
      break;
    }
  }

  return blob;
}

type FilterOptions = {
  saturate?: number;
  contrast?: number;
  exposure?: number;
};
/** 應用濾鏡，返回 Blob。 */
export async function filterImage(file: Blob, options: FilterOptions) {
  let blob = new Blob([file], { type: file.type });

  options = options || {};
  const { saturate = 1, contrast = 1, exposure = 1 } = options;
  const filters = createFilter({ saturate, contrast, exposure });

  blob = await new Promise((resolve) => {
    new Compressor(blob, {
      mimeType: `image/png`,
      convertSize: Infinity,
      success: resolve,
      beforeDraw(context) {
        context.filter = filters;
        console.log(context);
      },
    });
  });

  return blob;
}
