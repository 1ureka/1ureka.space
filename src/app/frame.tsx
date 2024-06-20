"use client";

import { useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Box, CircularProgress, Divider, Stack } from "@mui/material";

import { BoxM, StackM } from "@/components/Motion";
import { layoutMotionProps } from "@/components/MotionProps";
import BookSpine from "@/components/(bookSpine)/BookSpine";
import Bookmarks from "@/components/(bookmarks)/Bookmarks";

const bookmarks: Record<string, { label: string; href: string }[]> = {
  "/": [{ label: "Index", href: "/" }],
  "/books": [
    { label: "Scene", href: "/books/scene" },
    { label: "Props", href: "/books/props" },
  ],
  "/tools": [
    { label: "Manager", href: "/tools/manager" },
    { label: "Editor", href: "/tools/editor" },
  ],
};

export default function Frame({
  header,
  content,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
}) {
  const pathname = usePathname();
  const rootPath = pathname.match(/^\/\w+/)?.[0] || "/";

  const ts = useRef(0);
  const key = useMemo(() => {
    ts.current += 1;
    return `${rootPath}-${ts.current}`;
  }, [rootPath]);

  return (
    <Stack direction="row" sx={{ height: 1, bgcolor: "content.layer2" }}>
      <BookSpine />

      <Box sx={{ px: 5, py: 3, height: 1, flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          <StackM
            key={key}
            sx={{ position: "relative", height: 1 }}
            {...layoutMotionProps}
          >
            <Bookmarks options={bookmarks[rootPath] || []} />

            <Stack
              component={"main"}
              sx={{
                bgcolor: "content.layer1",
                flexGrow: 1,
                borderRadius: "0 50px 5px 5px",
              }}
            >
              <Box sx={{ mt: "55px" }}>{header}</Box>

              <Divider flexItem variant="middle" />

              <Box sx={{ flexGrow: 1, height: "1px", overflowY: "auto" }}>
                {content}
              </Box>
            </Stack>
          </StackM>
        </AnimatePresence>
      </Box>

      <BoxM
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, transitionEnd: { display: "none" } }}
        sx={{
          position: "fixed",
          inset: 0,
          display: "grid",
          placeItems: "center",
        }}
      >
        <CircularProgress />
      </BoxM>
    </Stack>
  );
}
