import "server-only";
import sharp from "sharp";

/** 用於包裝所有在伺服器上log的函數 */
export function log(
  type: "UTILS" | "DATABASE" | "API" | "ACTION",
  message: string
) {
  console.log(new Date(Date.now()).toISOString() + ": ");
  console.log(`${type} : ${message}`);
  console.log("( this message should only appear on the server )");
  console.log("");
}

/** 伺服器版本的延遲執行 Promise 函式，用於等待一定的時間。 */
export function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * 使用Sharp調整大小並轉換輸入圖像，創建原始圖像。
 * 在調整大小時保持輸入圖像的寬高比。
 * @returns 一個Promise，解析為包含調整大小和轉換後圖像的Buffer。
 */
export async function createOriginBuffer(sharp: sharp.Sharp) {
  let { width, height } = await sharp.metadata();

  if (width === undefined || height === undefined) {
    throw new Error("there is no width or height in the image's metadata");
  }

  if (width / height > 16 / 9) {
    width = Math.floor((height * 16) / 9);
  } else if (width / height < 16 / 9) {
    height = Math.floor((width * 9) / 16);
  }

  const imageBuffer = await sharp
    .resize(width, height, { fit: "cover" })
    .webp({ quality: 100 })
    .toBuffer();

  return imageBuffer;
}

/**
 * 使用Sharp調整大小並轉換輸入圖像，創建縮略圖。
 * @returns 一個Promise，解析為包含調整大小和轉換後圖像的Buffer。
 */
export async function createThumbnailBuffer(sharp: sharp.Sharp) {
  const imageBuffer = await sharp
    .resize(480, 270, { fit: "cover" })
    .webp({ quality: 50 })
    .toBuffer();

  return imageBuffer;
}
