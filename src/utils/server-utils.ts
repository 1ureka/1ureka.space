const I = [
  { name: "image01.jpg", group: "primary.main" },
  { name: "image02.png", group: "secondary.main" },
  { name: "image03.gif", group: "info.main" },
  { name: "image04.webp", group: "primary.main" },
  { name: "image05.svg", group: "warning.main" },
  { name: "image06.jpg", group: "secondary.main" },
  { name: "image07.png", group: "info.main" },
  { name: "image08.gif", group: "primary.main" },
  { name: "image09.webp", group: "warning.main" },
  { name: "image10.svg", group: "secondary.main" },
  { name: "image11.jpg", group: "info.main" },
  { name: "image12.png", group: "primary.main" },
  { name: "image13.gif", group: "warning.main" },
  { name: "image14.webp", group: "secondary.main" },
  { name: "image15.svg", group: "info.main" },
  { name: "image16.jpg", group: "primary.main" },
  { name: "image17.png", group: "warning.main" },
  { name: "image18.gif", group: "secondary.main" },
  { name: "image19.webp", group: "info.main" },
  { name: "image20.svg", group: "primary.main" },
  { name: "image21.jpg", group: "warning.main" },
  { name: "image22.png", group: "secondary.main" },
  { name: "image23.gif", group: "info.main" },
  { name: "image24.webp", group: "primary.main" },
  { name: "image25.svg", group: "warning.main" },
];

/** 伺服器版本的延遲執行 Promise 函式，用於等待一定的時間。 */
export function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** TODO: Move to /data/images.ts */
export async function getImageIndex(category: string) {
  await delay((Math.random() + 1) * 250);

  console.log("SEARCH: Images table " + category);

  type ImageListItem = { name: string; group: string };
  const imageList: ImageListItem[] = I; // TODO get real index

  // console.log("check this message only show on server");
  return imageList;
}
