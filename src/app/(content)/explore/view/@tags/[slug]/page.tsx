import { delay } from "@/utils/server-utils";
import { getProjectId } from "../../utils";

import { Box, Divider } from "@mui/material";
import Tag from "@/components/(explore)/Tag";

export default async function Page({ params }: { params: { slug: string } }) {
  await delay(Math.random() * 2500);

  const id = await getProjectId(params.slug);
  const tags = null; //TODO: get the project's tags from the database

  return (
    <>
      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Tag active label="cam 1" />
        <Tag label="cam 2" />
        <Tag label="cam 3" />
        <Tag label="cam 4" />
        <Tag label="cam 5" />
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Tag label="morning" active />
        <Tag label="day" />
      </Box>
    </>
  );
}
