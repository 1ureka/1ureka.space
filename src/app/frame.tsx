"use client";

import { useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Box, CircularProgress, Stack } from "@mui/material";

import { BoxM, DividerM, StackM } from "@/components/Motion";
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

function OverflowContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box position="absolute" sx={{ inset: 0, px: 5, py: 3, overflowY: "auto" }}>
      {children}
    </Box>
  );
}

function ArticleContainer({ children }: { children: React.ReactNode }) {
  const borderRadius = "0 50px 10px 10px";
  return (
    <Stack
      component="article"
      sx={{ bgcolor: "content.layer1", flexGrow: 1, borderRadius }}
    >
      {children}
    </Stack>
  );
}

export default function Frame({
  header,
  content,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
}) {
  const pathname = usePathname();
  const category = findBookmarkCategory(pathname);

  const ts = useRef(0);
  const key = useMemo(() => {
    ts.current += 1;
    return `${category}-${ts.current}`;
  }, [category]);

  if (typeof category !== "string") {
    if (typeof window !== "undefined") window.location.replace("/404");
    return null;
  }

  return (
    <Stack direction="row" sx={{ height: 1, bgcolor: "content.layer2" }}>
      <BookSpine component="nav" />

      <Box
        component="main"
        sx={{ position: "relative", flexGrow: 1, height: 1 }}
      >
        <div style={{ position: "absolute", inset: 0 }} id="portal-root" />

        <OverflowContainer>
          <AnimatePresence mode="wait">
            <StackM
              key={key}
              sx={{ position: "relative", minHeight: 1 }}
              {...layoutMotionProps}
            >
              <Bookmarks component="nav" options={bookmarks[category]} />

              <ArticleContainer>
                <Box component="section" sx={{ mt: "55px", zIndex: 1 }}>
                  {header}
                </Box>
                <DividerM layout flexItem variant="middle" />
                <Box component="section" sx={{ display: "grid", flexGrow: 1 }}>
                  {content}
                </Box>
              </ArticleContainer>
            </StackM>
          </AnimatePresence>
        </OverflowContainer>
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
