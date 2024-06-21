import { Button, Skeleton, Typography } from "@mui/material";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";

import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar, yVar } from "@/components/MotionProps";

const text = {
  project: "PJ26",
  info: `It includes a variety of models, from small screws to buildings, 
      to meet outdoor scene requirements. It provides pre-packaged objects
      based on instances.`,
};

export default function Header() {
  return (
    <StackM
      {...layoutChildMotionProps}
      direction="row"
      alignItems="flex-end"
      spacing={1}
    >
      <StackM
        variants={yScaleVar}
        sx={{ p: 3, alignItems: "flex-start" }}
        spacing={0.5}
      >
        <Typography variant="caption">PROJECTS:</Typography>
        <Typography variant="caption" sx={{ color: "text.primary" }}>
          {text.project}
        </Typography>
      </StackM>

      <StackM
        variants={yScaleVar}
        sx={{ p: 3, alignItems: "flex-start" }}
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

      <StackM variants={yVar} alignItems="center" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="body2">{text.info}</Typography>
      </StackM>

      <BoxM variants={yScaleVar} sx={{ p: 3 }}>
        <Button startIcon={<AutoFixHighRoundedIcon fontSize="small" />}>
          filter
        </Button>
      </BoxM>
    </StackM>
  );
}
