import { Stack, Typography } from "@mui/material";
import { Chart } from "@/components/(home)";
import { summaryCategorySize } from "@/data/table";

import { BoxM, DividerM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";
import { yScaleVar, yVar } from "@/components/MotionProps";

export default async function Header() {
  const { props, scene } = await summaryCategorySize();
  const propsSize = parseFloat((props / 1024 / 1024).toFixed(2));
  const sceneSize = parseFloat((scene / 1024 / 1024).toFixed(2));

  const data = [
    { value: sceneSize, label: "scene", color: "#e783ad" },
    { value: propsSize, label: "props", color: "#e783ad90" },
  ];

  return (
    <BoxM {...createMotionProps()}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ py: 3, px: { xs: 4.5, sm: 7, md: 9 } }}
        gap={3}
      >
        <Stack
          direction={{ sm: "row" }}
          gap={{ xs: 1, sm: 3 }}
          alignItems={{ sm: "flex-end" }}
        >
          <BoxM variants={yScaleVar}>
            <Typography variant="h5">{"1ureka's space"}</Typography>
          </BoxM>

          <DividerM variants={yScaleVar} orientation="vertical" flexItem />

          <BoxM variants={yVar}>
            <Typography>
              My personal website for storing and managing a portfolio of 3D CG,
              with basic image editing capabilities.
            </Typography>
          </BoxM>
        </Stack>

        <Chart data={data} />
      </Stack>
    </BoxM>
  );
}

export const dynamic = "force-dynamic";
