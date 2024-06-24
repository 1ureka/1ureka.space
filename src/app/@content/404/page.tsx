import { NextLinkComposed } from "@/components/Link";
import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { Button, Typography } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

export default function NotFound() {
  return (
    <StackM
      {...layoutChildMotionProps}
      spacing={3}
      alignItems={"center"}
      sx={{ maxWidth: 375, m: "auto", p: 10 }}
    >
      <BoxM variants={yScaleVar}>
        <ErrorRoundedIcon fontSize="large" color="primary" />
      </BoxM>

      <StackM variants={yScaleVar} spacing={1} alignItems={"center"}>
        <Typography variant="h6">Something went wrong...</Typography>
        <Typography variant="body2" className="text-ellipsis">
          404: The requested resource could not be found.
        </Typography>
      </StackM>

      <BoxM variants={yScaleVar}>
        <Button component={NextLinkComposed} to="/">
          Home
        </Button>
      </BoxM>
    </StackM>
  );
}
