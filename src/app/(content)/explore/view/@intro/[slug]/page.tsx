import { delay } from "@/utils/server-utils";
import { getProjectId } from "../../utils";

import { Box, Stack, Typography } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

export default async function Page({ params }: { params: { slug: string } }) {
  await delay(Math.random() * 2500);

  const id = await getProjectId(params.slug);
  const text = null; // TODO: get the project's information

  return (
    <Stack sx={{ height: 1, gap: 1, justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <AutoStoriesRoundedIcon color="action" />
        <Typography variant="h4" sx={{ color: "text.primary" }}>
          Stories
        </Typography>
      </Box>

      <Typography variant="caption">
        * click on the image to view the full resolution
      </Typography>
    </Stack>
  );
}
