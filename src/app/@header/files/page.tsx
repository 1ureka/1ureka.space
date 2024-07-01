import { BoxM, StackM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar, yVar } from "@/components/MotionProps";
import { Divider, Typography } from "@mui/material";

const text = {
  title: "File Manager",
  info: `Synced in real-time with the backend, 
    manage the images in your album with ease, 
    facilitating effortless addition, updating, and deletion of images.`,
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
