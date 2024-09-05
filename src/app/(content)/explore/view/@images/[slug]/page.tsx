import { getSortedMetadata } from "@/data/metadata";
import { getProjectId } from "../../utils";

import { delay } from "@/utils/server-utils";
import { clamp, mapArrayToRange, polarizeArray } from "@/utils/utils";
import { generatePRNGArray, sortArrayByPRNG } from "@/utils/utils";

import MasonryImage from "@/components/(explore)/MasonryImage";

export default async function Page({ params }: { params: { slug: string } }) {
  await delay(Math.random() * 2500);
  const id = await getProjectId(params.slug);

  const randomArrays = generateRandomArrays();
  const randomSrcList = await getThumbnails(id); // TODO: get the project's thumbnails

  return (
    <>
      {randomArrays.rows.map((row, i) => (
        <MasonryImage
          key={i}
          row={row}
          opacity={clamp(randomArrays.opacity[i], 0.3, 1)}
          shadow={randomArrays.shadow[i]}
          zIndex={randomArrays.shadow[i] / 2}
          x={randomArrays.x[i]}
          y={randomArrays.y[i]}
          src={randomSrcList[i % randomSrcList.length]}
        />
      ))}
    </>
  );
}

async function getThumbnails(projectId: string) {
  const idList = await getSortedMetadata("props");
  const thumbnailPathList = idList.map(
    ({ id }) => `/api/image/${id}/thumbnail`
  );

  return sortArrayByPRNG(thumbnailPathList, 200);
}

function generateRandomArrays() {
  const amount = 55;
  const rows = generatePRNGArray(0, amount, [1, 2, 3]);
  const x = generatePRNGArray(21, amount, [0, 100]);
  const y = generatePRNGArray(23, amount, [0, 100]);

  const opacity = polarizeArray(
    generatePRNGArray(3.22, amount, [0, 1]),
    2.5,
    0.5
  );
  const shadow = mapArrayToRange(polarizeArray(opacity), [1, 20], true);

  return { rows, x, y, opacity, shadow };
}
