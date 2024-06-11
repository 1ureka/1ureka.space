import { Button, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { BoxM, DividerM, StackM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar, yVar } from "@/components/MotionProps";

export default function Header() {
  return (
    <BoxM {...layoutChildMotionProps}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{ p: 3, pr: 6 }}
        spacing={1}
      >
        <Stack direction="row" spacing={3} alignItems="flex-end">
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

        <StackM variants={yScaleVar}>
          <Typography variant="caption">Sign In</Typography>
          <Button startIcon={<GitHubIcon fontSize="small" />}>GitHub</Button>
        </StackM>
      </Stack>
    </BoxM>
  );
}
