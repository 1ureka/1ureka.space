"use cleint";

import { ViewField } from "..";
import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

import { Button, Box, Stack, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

export default function ViewSection() {
  return (
    <StackM variants={yScaleVar}>
      <Box>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="subtitle1">Views: </Typography>
          <Button startIcon={<AddBoxRoundedIcon />} size="small">
            <Typography variant="body1" color="inherit">
              Add
            </Typography>
          </Button>
        </Stack>

        <Typography variant="caption" color="error.main">
          * At least one View is required.
        </Typography>
      </Box>

      <Stack gap={1}>
        <ViewField checked />
      </Stack>
    </StackM>
  );
}
