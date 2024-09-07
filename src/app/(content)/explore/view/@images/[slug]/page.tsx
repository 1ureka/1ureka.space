import { getProject } from "../../utils";
import { clamp, mapArrayToRange, polarizeArray } from "@/utils/utils";
import { generatePRNGArray, sortArrayByPRNG } from "@/utils/utils";
import MasonryImage from "@/components/(explore)/MasonryImage";

export default async function Page({ params }: { params: { slug: string } }) {
  const randomArrays = generateRandomArrays();
  const data = await getProject(params.slug);
  const randomSrcList = sortArrayByPRNG(
    data.map(({ metadataId }) => `/api/image/${metadataId}/thumbnail`),
    200
  );

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

function generateRandomArrays() {
  const amount = 55;
  const rows = generatePRNGArray(0, amount, [1, 2, 3]);
  const x = generatePRNGArray(13, amount, [1, 3]);
  const y = generatePRNGArray(24, amount, [1, 3]);

  const raw = polarizeArray(generatePRNGArray(3.22, amount, [0, 1]), 2.5, 0.5);
  const shadow = mapArrayToRange(polarizeArray(raw), [1, 20], true);
  const opacity = mapArrayToRange(raw, [0.45, 0.85]);

  return { rows, x, y, opacity, shadow };
}
