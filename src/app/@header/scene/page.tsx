import { Skeleton, Typography } from "@mui/material";
import { BoxM, DividerM, StackM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar, yVar } from "@/components/MotionProps";

import { cookies } from "next/headers";

const text = {
  project: "PJ27, PJ28",
  info: `Reimagining classic scenes from anime and games with a realistic
      touch, along with original works inspired by Japan’s countryside.`,
};

export default async function Header() {
  const cookie = cookies();
  console.log(cookie);
  await new Promise((res) => setTimeout(res, 3500));
  throw new Error("custom header error for testing error UI");

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
          {text.project}
        </Typography>
      </StackM>

      <StackM
        variants={yScaleVar}
        sx={{ alignItems: "flex-start" }}
        spacing={0.5}
      >
        <Typography variant="caption">INCLUDES:</Typography>
        <Skeleton animation="wave">
          <Typography variant="caption">10 Images</Typography>
        </Skeleton>
        {/* <Typography variant="caption" sx={{ color: "text.primary" }}>
          {includes}
        </Typography> */}
      </StackM>

      <DividerM variants={yScaleVar} orientation="vertical" flexItem />

      <BoxM variants={yVar} alignItems="center">
        <Typography variant="body2">{text.info}</Typography>
      </BoxM>
    </StackM>
  );
}
