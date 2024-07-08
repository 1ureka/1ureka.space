import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar, yVar } from "@/components/MotionProps";
import { Divider, Typography } from "@mui/material";

const text = {
  title: "Image Editor",
  info: `A toolkit featuring image conversion, compression, 
    and filtering. It supports batch processing and includes before-and-after comparison.`,
};

export default function Header() {
  return (
    <StackM
      {...layoutChildMotionProps()}
      direction="row"
      alignItems="flex-end"
      spacing={3}
      sx={{ px: 9, py: 3, height: "fit-content" }}
    >
      <BoxM variants={yScaleVar}>
        <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
          {text.title}
        </Typography>
      </BoxM>
      <BoxM variants={yScaleVar} height={"auto"} alignSelf={"stretch"}>
        <Divider orientation="vertical" />
      </BoxM>
      <BoxM variants={yVar}>
        <Typography variant="body2">{text.info}</Typography>
      </BoxM>
    </StackM>
  );
}
