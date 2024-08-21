import "server-only";

import type { ImageMetadataWithIndex } from "@/data/type";
import { Box } from "@mui/material";

import Asides from "./block/Asides";
import Container from "./display/Container";
import CarouselsImage from "./block/CarouselsImage";
import Name from "./display/Name";
import Slides from "./media/Slides";

export default function Carousels({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  return (
    <Container metadataList={metadataList}>
      <Asides
        metadataList={metadataList}
        sx={{ position: "absolute", inset: "3% 10% 3% 2%" }}
      />

      <Box
        position="fixed"
        sx={{ inset: 0, display: "grid", placeItems: "center" }}
      >
        <CarouselsImage metadataList={metadataList} />

        <Name
          metadataList={metadataList}
          sx={{ position: "absolute", bottom: "3%" }}
        />
      </Box>

      <Slides
        metadataList={metadataList}
        sx={{ position: "absolute", inset: `0 1% 0 auto`, width: "12.5%" }}
      />
    </Container>
  );
}
