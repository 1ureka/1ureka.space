import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import Block from "@/components/Block";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default function Intro({
  sx,
  intro,
  tags,
}: {
  sx?: React.ComponentProps<typeof Box>["sx"];
  intro: React.ReactNode;
  tags: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 3, ...sx }}>
      <Block
        color="primary.main"
        variant="contained"
        decoration="right"
        shadow={20}
        SlotProps={{
          childContainer: { "data-mui-color-scheme": "dark" },
        }}
      >
        {intro}
      </Block>

      <Block decoration="right" shadow={20}>
        <BoxM
          variants={createMotionVar()}
          sx={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          <Typography variant="button" sx={{ pl: 1 }}>
            tags
          </Typography>

          <Tooltip title="shuffle tags" arrow>
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                right: 0,
                scale: "1.001",
                transition: "all 0.15s ease",
                "&:hover": { scale: "1.1" },
                "&:active": { scale: "0.97" },
              }}
            >
              <ShuffleRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </BoxM>

        <BoxM variants={createMotionVar()}>
          <Typography variant="caption" sx={{ pl: 1 }}>
            discover different camera angles, lighting and more . . .
          </Typography>
        </BoxM>

        {tags}
      </Block>
    </Box>
  );
}
