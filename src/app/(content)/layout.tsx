"use client";

import { useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Box, Divider, Stack } from "@mui/material";

import { StackM, layoutMotionProps } from "@/components/Motion";
import BookSpine from "@/components/(bookSpine)/BookSpine";
import Bookmarks from "@/components/(bookmarks)/Bookmarks";

type BookmarkOption = {
  label: string;
  href: string;
};

const bookmarks: Record<string, BookmarkOption[]> = {
  "/books": [
    { label: "Scene", href: "/books/scene" },
    { label: "Props", href: "/books/props" },
  ],
  "/tools": [
    { label: "Manager", href: "/tools/manager" },
    { label: "Editor", href: "/tools/editor" },
  ],
};

export default function Layout({
  header,
  content,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
}) {
  const pathname = usePathname();
  const rootPath = pathname.match(/^\/\w+/)?.[0] || "";

  const ts = useRef(0);
  const key = useMemo(() => {
    ts.current += 1;
    return `${rootPath}-${ts.current}`;
  }, [rootPath]);
  const options: BookmarkOption[] = useMemo(() => {
    return bookmarks[rootPath] || [];
  }, [rootPath]);

  const layoutProps = {
    sx: { position: "relative", height: 1 },
    ...layoutMotionProps,
  };
  const mainSx = {
    bgcolor: "content.layer1",
    flexGrow: 1,
    borderRadius: "0 50px 5px 5px",
  };

  return (
    <Stack direction="row" sx={{ height: 1, bgcolor: "content.layer2" }}>
      <BookSpine />

      <Box sx={{ px: 5, py: 3, height: 1, flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          <StackM key={key} {...layoutProps}>
            <Bookmarks options={options} />

            <Stack sx={mainSx} component={"main"}>
              <Box sx={{ mt: "55px" }}>{header}</Box>

              <Divider flexItem variant="middle" />

              <Box sx={{ flexGrow: 1, height: "1px", overflowY: "auto" }}>
                {content}
              </Box>
            </Stack>
          </StackM>
        </AnimatePresence>
      </Box>
    </Stack>
  );
}
