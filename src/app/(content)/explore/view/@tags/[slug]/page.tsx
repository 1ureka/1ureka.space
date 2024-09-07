import { removeDuplicates } from "@/utils/utils";
import { getProject } from "../../utils";

import { Divider } from "@mui/material";
import Tag from "@/components/(explore)/Tag";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getProject(params.slug);
  const tags = removeDuplicates(data.map(({ tag }) => tag).toSorted());
  const cameras = removeDuplicates(data.map(({ camera }) => camera).toSorted());

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
            active={camera === 0}
            disabled={cameras.length === 1}
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
            active={i === 0}
            disabled={tags.length === 1}
          />
        ))}
      </BoxM>
    </BoxM>
  );
}
