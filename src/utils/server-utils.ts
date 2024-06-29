import { shuffleArray } from "./utils";

const I = [
  {
    name: "image01.jpg",
    group: "primary.main",
    id: "1e75f096-22f5-4c4e-aba5-7b2bcafdcd03",
  },
  {
    name: "image02.png",
    group: "secondary.main",
    id: "4ad7368d-b1d0-4701-a8c6-4dd35c70dbde",
  },
  {
    name: "image03.gif",
    group: "info.main",
    id: "c47eed1c-5f28-46f8-ae07-96f527065f0c",
  },
  {
    name: "image04.webp",
    group: "primary.main",
    id: "568aec7f-437a-4d32-ac23-252964e32113",
  },
  {
    name: "image05.svg",
    group: "warning.main",
    id: "062f5aae-0054-404d-a5ea-269af8a51a03",
  },
  {
    name: "image06.jpg",
    group: "secondary.main",
    id: "21b9056d-8a7a-4332-b4cf-8c58bf57d36d",
  },
  {
    name: "image07.png",
    group: "info.main",
    id: "d985bc9b-a8db-4d20-9919-ceb90a90e0e6",
  },
  {
    name: "image08.gif",
    group: "primary.main",
    id: "d4ff4ef4-7317-45b8-8ea5-1bb89ef2a05c",
  },
  {
    name: "image09.webp",
    group: "warning.main",
    id: "d9f5525a-2d18-4a07-ae51-03c1662a23c3",
  },
  {
    name: "image10.svg",
    group: "secondary.main",
    id: "be1d7855-2110-40d1-a5b6-85fbaf6feaef",
  },
  {
    name: "image11.jpg",
    group: "info.main",
    id: "a50a499d-ece8-4545-b53f-0e9698bf32dd",
  },
  {
    name: "image12.png",
    group: "primary.main",
    id: "afd65425-b8b9-4404-993d-0525385b9ff2",
  },
  {
    name: "image13.gif",
    group: "warning.main",
    id: "308bdf0c-2d80-46ca-9efb-a49b9caf35fe",
  },
  {
    name: "image14.webp",
    group: "secondary.main",
    id: "ae10f492-b367-49c4-acf7-b5e659bf097e",
  },
  {
    name: "image15.svg",
    group: "info.main",
    id: "67f14ef6-4f8e-442a-84ea-8fe1b7d16cac",
  },
  {
    name: "image16.jpg",
    group: "primary.main",
    id: "1582a8fe-6d8f-418a-a62d-144ec9c55ea8",
  },
  {
    name: "image17.png",
    group: "warning.main",
    id: "2fcd1075-8115-41bc-9e14-34bfe93f5712",
  },
  {
    name: "image18.gif",
    group: "secondary.main",
    id: "73fe90b3-c508-4d3f-ad2b-104b2253df31",
  },
  {
    name: "image19.webp",
    group: "info.main",
    id: "960cbeb1-afd9-4edb-8bce-769fdb9070a5",
  },
  {
    name: "image20.svg",
    group: "primary.main",
    id: "3e1d3e5b-3cff-458e-8202-341126f0987d",
  },
  {
    name: "image21.jpg",
    group: "warning.main",
    id: "95407389-bc6f-4c67-8f66-de705af5acb8",
  },
  {
    name: "image22.png",
    group: "secondary.main",
    id: "adf2d277-e2e6-4c87-a432-32260d8b7629",
  },
  {
    name: "image23.gif",
    group: "info.main",
    id: "dc89a858-d582-4bee-aefb-62212fdec5df",
  },
  {
    name: "image24.webp",
    group: "primary.main",
    id: "09fd71c4-3b4d-49a6-bc83-c35528da541a",
  },
  {
    name: "image25.svg",
    group: "warning.main",
    id: "9674517b-72e6-4920-b05b-03c317b852bb",
  },
];

/** 伺服器版本的延遲執行 Promise 函式，用於等待一定的時間。 */
export function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** TODO: Move to /data/images.ts */
export async function getSortedMetadata(category: string) {
  await delay((Math.random() + 1) * 250);

  console.log("SEARCH: Images table " + category);

  const metadataList = shuffleArray(I); // TODO: get real metadataList by category
  // simulate possible random order row data

  const sortedMetadataList = metadataList
    .slice()
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
    .map((metadata, i) => ({ index: i, ...metadata }));

  return sortedMetadataList;
}
