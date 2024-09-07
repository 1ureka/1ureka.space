import { removeDuplicates } from "@/utils/utils";
import { getCoverData, getProject } from "../../utils";

import { Divider } from "@mui/material";
import Tag from "@/components/(explore)/Tag";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getProject(params.slug);
  const coverData = getCoverData(data, searchParams);

  const tags = removeDuplicates(data.map(({ tag }) => tag).toSorted());
  const currentTag = coverData.tag;

  const cameras = removeDuplicates(data.map(({ camera }) => camera).toSorted());
  const currentCamera = coverData.camera;

  return (
    <BoxM variants={createMotionVar()}>
      <BoxM
        sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}
        variants={createMotionVar()}
      >
        {cameras.map((camera, i) => (
          <Tag
            key={i}
            label={`cam ${camera + 1}`}
            active={currentCamera === camera}
            disabled={cameras.length === 1}
            href={`/explore/view/${params.slug}?${combineSearchParams(
              searchParams,
              { camera: `${camera}` }
            )}`}
          />
        ))}
      </BoxM>

      <Divider sx={{ my: 1 }} />

      <BoxM
        sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
        variants={createMotionVar()}
      >
        {tags.map((tag, i) => (
          <Tag
            key={i}
            label={tag}
            active={currentTag === tag}
            disabled={tags.length === 1}
            href={`/explore/view/${params.slug}?${combineSearchParams(
              searchParams,
              { tag }
            )}`}
          />
        ))}
      </BoxM>
    </BoxM>
  );
}

const combineSearchParams = (
  searchParams: { [key: string]: string | string[] | undefined },
  newRecord: { [key: string]: string }
) => {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.set(key, value);
    }
  });

  Object.entries(newRecord).forEach(([key, value]) => {
    params.set(key, value);
  });

  return params.toString();
};
