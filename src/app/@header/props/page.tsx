import { Typography } from "@mui/material";
import { getMetadataCount } from "@/data/table";

import { BoxM, DividerM, StackM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar, yVar } from "@/components/MotionProps";

const text = {
  project: "PJ26",
  info: `It includes a variety of models, from small screws to buildings, 
      to meet outdoor scene requirements. It provides pre-packaged objects
      based on instances.`,
};

export default async function Header() {
  const { project, info } = text;
  const count = await getMetadataCount("props");

  return (
    <StackM
      {...layoutChildMotionProps()}
      direction="row"
      alignItems="flex-end"
      spacing={6}
      sx={{ px: 9, py: 3 }}
    >
      <StackM
        variants={yScaleVar}
        sx={{ alignItems: "flex-start" }}
        spacing={0.5}
      >
        <Typography variant="caption">PROJECTS:</Typography>
        <Typography variant="caption" sx={{ color: "text.primary" }}>
          {project}
        </Typography>
      </StackM>

      <StackM
        variants={yScaleVar}
        sx={{ alignItems: "flex-start" }}
        spacing={0.5}
      >
        <Typography variant="caption">INCLUDES:</Typography>
        <Typography variant="caption" sx={{ color: "text.primary" }}>
          {count} images
        </Typography>
      </StackM>

      <DividerM variants={yScaleVar} orientation="vertical" flexItem />

      <BoxM variants={yVar} alignItems="center">
        <Typography variant="body2">{info}</Typography>
      </BoxM>
    </StackM>
  );
}
