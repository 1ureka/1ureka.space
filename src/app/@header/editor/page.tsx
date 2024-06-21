import { StackM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar, yVar } from "@/components/MotionProps";
import { Typography } from "@mui/material";

const text = {
  title: "Image Editor",
  info: `A toolkit featuring image conversion, compression, 
    and filtering. It supports batch processing and includes before-and-after comparison.`,
};

export default function Header() {
  return (
    <StackM
      {...layoutChildMotionProps}
      direction="row"
      alignItems="flex-end"
      spacing={1}
      sx={{ px: 4 }}
    >
      <StackM variants={yScaleVar} sx={{ p: 3 }}>
        <Typography variant="h6">{text.title}</Typography>
      </StackM>
      <StackM variants={yVar} sx={{ flexGrow: 1, p: 3, alignItems: "center" }}>
        <Typography variant="body2">{text.info}</Typography>
      </StackM>
    </StackM>
  );
}
