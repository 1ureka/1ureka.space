"use cleint";

import { PointField } from "..";
import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import { Box, Stack, Typography } from "@mui/material";

export default function PointSection() {
  return (
    <StackM variants={yScaleVar}>
      <Box>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="subtitle1">Points: </Typography>
          <Typography variant="caption">{"( 0 / 3 )"}</Typography>
        </Stack>

        <Typography variant="caption" color="error.main">
          * Some Points are missing.
        </Typography>
      </Box>

      <Stack gap={1}>
        <PointField from="View 1" to="View 2" type="edit" />
        <PointField from="View 1" to="View 3" type="add" />
      </Stack>
    </StackM>
  );
}
