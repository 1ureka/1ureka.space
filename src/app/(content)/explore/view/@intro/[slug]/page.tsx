import { getProject } from "../../utils";
import { Box, Stack, Typography } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getProject(params.slug);
  const { project, description } = data[0];

  return (
    <Stack sx={{ height: 1, gap: 2, justifyContent: "space-between" }}>
      <Stack sx={{ gap: 1.5 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <AutoStoriesRoundedIcon color="action" />
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            {project}
          </Typography>
        </Box>

        <Typography sx={{ color: "text.primary" }}>{description}</Typography>
      </Stack>

      <Typography variant="caption">
        * click on the image to view the full resolution
      </Typography>
    </Stack>
  );
}
