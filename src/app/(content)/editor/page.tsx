import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "editor",
};

import { Stack, Typography } from "@mui/material";
import { BoxM, DividerM, StackM } from "@/components/Motion";
import { createMotionProps, createMotionVar } from "@/components/MotionProps";

import Block from "@/components/Block";
import { EditPanel, EditPreview } from "@/components/(editor)";
import { EditOptions, EditTable } from "@/components/(editor)";

const text = {
  title: "Image Editor",
  info: `A toolkit featuring image conversion, compression, 
    and filtering. It supports batch processing and includes before-and-after comparison.`,
};

const gap = 3;

const containerSx = {
  flexDirection: { lg: "row" },
  gap,
};

const leftSx = {
  position: { xs: "relative", lg: "sticky" },
  top: { xs: "", lg: 0 },
  flexGrow: 1,
  gap,
};

const headerSx = {
  display: "flex",
  direction: { sm: "row" },
  alignItems: { sm: "center" },
  gap,
};

export default function EditorContent() {
  return (
    <StackM {...createMotionProps()} sx={containerSx}>
      <Stack sx={leftSx}>
        <Block
          decoration="left"
          SlotProps={{ childContainer: { sx: headerSx } }}
        >
          <BoxM variants={createMotionVar()}>
            <Typography variant="h6" sx={{ whiteSpace: { md: "nowrap" } }}>
              {text.title}
            </Typography>
          </BoxM>

          <DividerM
            variants={createMotionVar()}
            orientation="vertical"
            flexItem
          />

          <BoxM variants={createMotionVar({ from: { scale: 1 } })}>
            <Typography variant="body2">{text.info}</Typography>
          </BoxM>
        </Block>

        <Block decoration="left" sx={{ minHeight: 450, height: 1 }}>
          <EditPreview />
        </Block>
      </Stack>

      <Block
        decoration="right"
        color="primary.main"
        sx={{ width: { xs: 1, lg: 450 } }}
        SlotProps={{
          childContainer: {
            sx: { display: "flex", flexDirection: "column", gap },
          },
        }}
      >
        <EditPanel options={<EditOptions />} output={<EditTable />} />
      </Block>
    </StackM>
  );
}
