import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "settings",
};

import { BoxM, StackM } from "@/components/Motion";
import { createMotionProps, createMotionVar } from "@/components/MotionProps";
import { Alert, Stack, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

import Block from "@/components/Block";
import AuthMessages from "@/components/(settings)/AuthMessages";
import UserButton from "@/components/(settings)/UserButton";
import DisplayToggle from "@/components/(settings)/DisplayToggle";
import dynamic from "next/dynamic";
const ThemeToggle = dynamic(
  () => import("@/components/(settings)/ThemeToggle"),
  { ssr: false }
);

const gap = {
  xs: 1.5,
  md: 2.5,
  lg: 3.5,
};

const containerSx: BoxProps["sx"] = {
  display: "grid",
  gridTemplateColumns: { xs: "", md: "1fr 1fr" },
  gridTemplateRows: { xs: "auto 1fr", md: "1fr" },
  gap,
  height: 1,
};

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { success, error } = searchParams;

  return (
    <BoxM {...createMotionProps()} sx={containerSx}>
      <AuthMessages success={success} error={error} />

      <Stack sx={{ gap }}>
        <Block color="primary.main" decoration="left">
          <StackM gap={0.5} mb={3} variants={createMotionVar()}>
            <Typography variant="h6">Authentication</Typography>
            <Alert
              severity="error"
              variant="filled"
              sx={{ bgcolor: "primary.main", py: 0.5 }}
              icon={<WarningRoundedIcon />}
            >
              This is for internal use only. Only specific github users can sign
              in.
            </Alert>
          </StackM>

          <BoxM
            variants={createMotionVar()}
            sx={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              placeItems: "center start",
              gap: 1,
            }}
          >
            <UserButton />
          </BoxM>
        </Block>

        <Block color="primary.main" decoration="left">
          <StackM gap={0.5} mb={1} variants={createMotionVar()}>
            <Typography variant="h6">Theme</Typography>
          </StackM>

          <Stack gap={2.5} direction="row">
            <ThemeToggle />
          </Stack>
        </Block>
      </Stack>

      <Stack sx={{ gap }}>
        <Block color="secondary.main" decoration="right">
          <StackM gap={0.5} mb={3} variants={createMotionVar()}>
            <Typography variant="h6">Images Display</Typography>
            <Alert
              severity="info"
              variant="filled"
              sx={{ bgcolor: "#65AF90bb", py: 0.5 }}
            >
              For <code>`/gallery/scene`</code> and{" "}
              <code>`/gallery/props`</code> pages.
            </Alert>
          </StackM>

          <Stack gap={2.5} direction="row">
            <DisplayToggle />
          </Stack>
        </Block>
      </Stack>
    </BoxM>
  );
}
