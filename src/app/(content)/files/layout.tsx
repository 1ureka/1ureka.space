import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "files",
};

import { Typography } from "@mui/material";
import Block from "@/components/Block";
import CategoryToggle from "@/components/(files)/CategoryToggle";
import RefreshButton from "@/components/(files)/RefreshButton";

import { validateUserSession } from "@/auth";
import { BoxM, StackM } from "@/components/Motion";
import { createMotionProps, createMotionVar } from "@/components/MotionProps";

const gap = { xs: 1.5, md: 2.5, lg: 3.5 };

const containerSx: React.ComponentProps<typeof BoxM>["sx"] = {
  position: "relative",
  display: "grid",
  gridTemplateAreas: `"header1 header2" "content content"`,
  gridTemplateColumns: "auto 1fr",
  height: "fit-content",
  gap,
};

export default async function Layout({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  await validateUserSession();

  return (
    <BoxM {...createMotionProps()} sx={containerSx}>
      <Block
        decoration="left"
        variant="contained"
        color="primary.main"
        SlotProps={{
          childContainer: {
            "data-mui-color-scheme": "dark",
            sx: {
              gridArea: "header1",
              display: "flex",
              alignItems: "flex-end",
              gap,
            },
          },
        }}
      >
        <BoxM variants={createMotionVar()} mr={1}>
          <Typography variant="h5" sx={{ color: "text.primary" }}>
            File Shelf
          </Typography>
        </BoxM>

        <StackM variants={createMotionVar()} gap={1}>
          <Typography variant="subtitle2">CATEGORY:</Typography>
          <CategoryToggle />
        </StackM>

        <RefreshButton />
      </Block>

      <Block
        decoration="right"
        color="primary.main"
        sx={{ gridArea: "header2" }}
      >
        {header}
      </Block>

      <Block sx={{ gridArea: "content" }}>{children}</Block>
    </BoxM>
  );
}
