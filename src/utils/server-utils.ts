/** 用於包裝所有在伺服器上log的函數 */
export function log(
  type: "UTILS" | "DATABASE" | "API" | "ACTION",
  message: string
) {
  console.log(`${type} : ${message}`);
  console.log("( this message should only see on the server )");
}

/** 伺服器版本的延遲執行 Promise 函式，用於等待一定的時間。 */
export function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

// export function compressImage(image: type, options: {}) {
//   return image;
// }
