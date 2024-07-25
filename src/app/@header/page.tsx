import { Box, Stack, Typography } from "@mui/material";
import { BoxM, DividerM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar, yVar } from "@/components/MotionProps";

export default function Header() {
  return (
    <BoxM {...layoutChildMotionProps()}>
      <Box sx={{ py: 3, px: { xs: 4.5, sm: 9 } }}>
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
      </Box>
    </BoxM>
  );
}
