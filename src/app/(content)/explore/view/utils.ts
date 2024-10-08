import { getAllExploreMetadata } from "@/data/metadata";
import { notFound } from "next/navigation";
import { SingleFlight } from "@/utils/utils";

const flight = new SingleFlight();
export async function getProject(slug: string) {
  let data = null;
  const res = await flight.execute(getAllExploreMetadata);

  // 扁平化數據
  const flated = res.map((item) => ({
    metadataId: item.metadataId,
    project: item.metadata.group,
    name: item.metadata.name,
    time: item.metadata.updatedAt as Date,
    description: item.detail,
    tag: item.tag,
    camera: item.camera,
  }));

  // 按專案分組
  const sortedByProject: Record<string, typeof flated> = flated.reduce(
    (acc, item) => {
      if (!acc[item.project]) {
        acc[item.project] = [];
      }
      acc[item.project].push(item);
      return acc;
    },
    {} as Record<string, typeof flated>
  );

  // 根據每個專案中的每張圖片的最後更新時間排序
  const orderedByTime = Object.values(sortedByProject).sort((a, b) => {
    const aTime = Math.max(...a.map((item) => item.time.getTime()));
    const bTime = Math.max(...b.map((item) => item.time.getTime()));
    return aTime - bTime;
  });

  if (slug === "newest") {
    data = orderedByTime[0];
  }

  const index = Number(slug);
  if (Number.isInteger(index) && index >= 0) {
    data = orderedByTime[index] || null;
  }

  if (data === null) {
    notFound();
  }

  return data.sort((a, b) => a.name.localeCompare(b.name));
}

export function getCoverData(
  data: Awaited<ReturnType<typeof getProject>>,
  searchParams: { [key: string]: string | string[] | undefined }
) {
  const { tag, camera } = searchParams;

  if (isValidSearchParam(tag)) {
    data = data.filter((item) => item.tag === tag);
  }

  const cameraIndex = Number(camera);

  if (
    isValidSearchParam(camera) &&
    Number.isInteger(cameraIndex) &&
    cameraIndex >= 0
  ) {
    data = data.filter((item) => item.camera === cameraIndex);
  }

  return data[0];
}

const isValidSearchParam = (
  param: string | string[] | undefined
): param is string => {
  return typeof param === "string";
};
