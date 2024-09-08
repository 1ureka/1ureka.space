import { Box, Stack, Typography } from "@mui/material";
import Block from "@/components/Block";
import DropShadowContainer from "./display/DropShadowContainer";
import Carousels from "./block/Carousels";
import Indicator from "./block/Indicator";
import { getAllExploreMetadata } from "@/data/metadata";

export default async function Feed({
  sx,
}: {
  sx?: React.ComponentProps<typeof Box>["sx"];
}) {
  const res = await getAllExploreMetadata();
  const sortedByProject: Record<string, typeof res> = res.reduce(
    (acc, item) => {
      if (!acc[item.metadata.group]) {
        acc[item.metadata.group] = [];
      }
      acc[item.metadata.group].push(item);
      return acc;
    },
    {} as Record<string, typeof res>
  );

  const metadataList = Object.values(sortedByProject).map(
    (list) =>
      list.toSorted((a, b) => a.metadata.name.localeCompare(b.metadata.name))[0]
  );

  const total = metadataList.length;
  const srcList = metadataList
    .toSorted((a, b) => a.metadata.name.localeCompare(b.metadata.name))
    .map(({ metadataId }) => `/api/image/${metadataId}/thumbnail`);

  const typoProps: React.ComponentProps<typeof Typography> = {
    variant: "button",
    sx: { color: "text.secondary" },
  };

  return (
    <DropShadowContainer sx={sx}>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}
      >
        <Block decoration="left" sx={{ gridColumn: "span 5" }}>
          <Typography {...typoProps}>Continue exploring . . .</Typography>

          <Carousels srcList={srcList} />
        </Block>

        <Block decoration="right" sx={{ gridColumn: "span 2" }}>
          <Stack sx={{ height: 1 }}>
            <Typography {...typoProps}>Current At . . .</Typography>

            <Box sx={{ position: "relative", height: 1 }}>
              <Indicator total={total} />
            </Box>
          </Stack>
        </Block>
      </Box>
    </DropShadowContainer>
  );
}
