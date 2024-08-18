import { BoxM, DividerM, StackM } from "@/components/Motion";
import { createStaggerVar } from "@/components/MotionProps";
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
      {...createStaggerVar()}
      direction={{ sm: "row" }}
      alignItems={{ sm: "flex-end" }}
      gap={{ xs: 1, sm: 3 }}
      sx={{ py: 3, px: { xs: 3, sm: 9 } }}
    >
      <BoxM variants={yScaleVar}>
        <Typography variant="h6" sx={{ whiteSpace: { md: "nowrap" } }}>
          {text.title}
        </Typography>
      </BoxM>

      <DividerM variants={yScaleVar} orientation="vertical" flexItem />

      <BoxM variants={yVar}>
        <Typography variant="body2">{text.info}</Typography>
      </BoxM>
    </StackM>
  );
}
