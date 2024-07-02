import { Box, Skeleton, Typography } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { IconButton, Button } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";

import { BoxM, StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

export default function OptionsF() {
  return (
    <StackM variants={yScaleVar} gap={8}>
      <StackM variants={yScaleVar} gap={1} alignItems="flex-start">
        <Typography variant="subtitle2">CATEGORY:</Typography>
        <Skeleton>
          <ToggleButtonGroup color="primary" size="small">
            <ToggleButton value="scene" sx={{ py: 1 }}>
              Scene
            </ToggleButton>
            <ToggleButton value="props" sx={{ py: 1 }}>
              Props
            </ToggleButton>
          </ToggleButtonGroup>
        </Skeleton>
      </StackM>

      <StackM variants={yScaleVar} gap={1} alignItems="flex-start">
        <Typography variant="subtitle2">OPERATION:</Typography>

        <Skeleton>
          <Button startIcon={<AddToPhotosRoundedIcon fontSize="small" />}>
            Add Image
          </Button>
        </Skeleton>

        <Skeleton>
          <Button startIcon={<AddToPhotosRoundedIcon fontSize="small" />}>
            Verify Integrity
          </Button>
        </Skeleton>
      </StackM>

      <Box sx={{ flexGrow: 1 }} />

      <BoxM variants={yScaleVar}>
        <Skeleton>
          <Typography variant="body2">
            <IconButton>
              <RefreshRoundedIcon fontSize="small" />
            </IconButton>
            * Last Updated: {new Date(Date.now()).toLocaleTimeString()}
          </Typography>
        </Skeleton>
      </BoxM>
    </StackM>
  );
}
