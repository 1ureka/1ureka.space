import { Box, Stack, Typography } from "@mui/material";
import Block from "@/components/Block";
import DropShadowContainer from "./display/DropShadowContainer";
import Carousels from "./block/Carousels";
import Indicator from "./block/Indicator";

export default function Feed({
  sx,
  total,
}: {
  sx?: React.ComponentProps<typeof Box>["sx"];
  total: number;
}) {
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

          <Carousels total={total} />
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
