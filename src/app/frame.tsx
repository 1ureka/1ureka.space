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
  index: [{ label: "Index", href: "/" }],
  books: [
    { label: "Scene", href: "/scene" },
    { label: "Props", href: "/props" },
  ],
  tools: [
    { label: "Shelf", href: "/files" },
    { label: "Editor", href: "/editor" },
  ],
  notFound: [],
};

function findBookmarkCategory(pathname: string): string | null {
  if (pathname === "/404") return "notFound";

  for (const category of Object.keys(bookmarks)) {
    if (bookmarks[category].some((item) => item.href === pathname))
      return category;
  }

  return null;
}

export default function Frame({
  header,
  content,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
}) {
  const pathname = usePathname();
  const rootPath = findBookmarkCategory(pathname);

  const ts = useRef(0);
  const key = useMemo(() => {
    ts.current += 1;
    return `${rootPath}-${ts.current}`;
  }, [rootPath]);

  if (typeof rootPath !== "string") {
    if (typeof window !== "undefined") window.location.replace("/404");
    return null;
  }

  return (
    <Stack direction="row" sx={{ height: 1, bgcolor: "content.layer2" }}>
      <BookSpine />

      <Box sx={{ px: 5, py: 3, height: 1, flexGrow: 1, overflowY: "auto" }}>
        <AnimatePresence mode="wait">
          <StackM
            key={key}
            sx={{ position: "relative", minHeight: 1 }}
            {...layoutMotionProps}
          >
            <Bookmarks options={bookmarks[rootPath]} />

            <Stack
              component={"main"}
              sx={{
                bgcolor: "content.layer1",
                flexGrow: 1,
                borderRadius: "0 50px 10px 10px",
              }}
            >
              <Box sx={{ mt: "55px" }}>{header}</Box>

              <Divider flexItem variant="middle" />

              <Box sx={{ flexGrow: 1 }}>{content}</Box>
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
