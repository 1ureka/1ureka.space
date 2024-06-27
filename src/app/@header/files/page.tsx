import { cookies } from "next/headers";

import { StackM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar, yVar } from "@/components/MotionProps";
import { Typography } from "@mui/material";

const text = {
  title: "File Manager",
  info: `Synced in real-time with the backend, 
    manage the images in your album with ease, 
    facilitating effortless addition, updating, and deletion of images.`,
};

export default async function Header() {
  const cookie = cookies();
  console.log(cookie);
  await new Promise((res) => setTimeout(res, 3500));
  throw new Error("custom header error for testing error UI");

  return (
    <StackM
      {...layoutChildMotionProps()}
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
