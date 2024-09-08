import { getProject } from "../../utils";
import { Stack, Typography } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import { BoxM, StackM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getProject(params.slug);
  const { project, description } = data[0];

  return (
    <StackM
      sx={{ height: 1, gap: 2, justifyContent: "space-between" }}
      variants={createMotionVar()}
    >
      <Stack sx={{ gap: 1.5 }}>
        <BoxM
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
          variants={createMotionVar()}
        >
          <AutoStoriesRoundedIcon color="action" />
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            {project}
          </Typography>
        </BoxM>

        <BoxM variants={createMotionVar()}>
          <Typography sx={{ color: "text.primary" }}>{description}</Typography>
        </BoxM>
      </Stack>

      <BoxM variants={createMotionVar()}>
        <Typography variant="caption">
          * click on the image to view the full resolution
        </Typography>
      </BoxM>
    </StackM>
  );
}
