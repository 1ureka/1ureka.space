"use client";

import { useMemo, useRef } from "react";
import { Toaster } from "react-hot-toast";
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
    { label: "Explore", href: "/explore/0" },
    { label: "Scene", href: "/scene" },
    { label: "Props", href: "/props" },
  ],
  tools: [
    { label: "Shelf", href: "/files" },
    { label: "Editor", href: "/editor" },
  ],
  notFound: [{ label: "Not Found", href: "/404" }],
} as const;

function findBookmarkCategory(pathname: string): keyof typeof bookmarks {
  for (const category of Object.keys(bookmarks)) {
    if (
      bookmarks[category].some((item) => {
        const path = `/${item.href.split("/")[1]}`; // "/explore/0" -> "/explore"
        if (path === "/") return pathname === "/"; // every path starts with "/"
        return pathname.startsWith(path);
      })
    )
      return category;
  }

  return "notFound";
}

function OverflowContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      position="absolute"
      sx={{
        inset: 0,
        px: { xs: 0, sm: 3, md: 5 },
        py: 3,
        overflowY: "auto",
        scrollbarGutter: "stable",
      }}
    >
      {children}
    </Box>
  );
}

function ArticleContainer({ children }: { children: React.ReactNode }) {
  const borderRadius = "0 50px 10px 10px";
  return (
    <Stack
      component="article"
      sx={{
        position: "relative",
        bgcolor: "content.layer1",
        flexGrow: 1,
        borderRadius,
      }}
    >
      {children}
    </Stack>
  );
}

export default function Frame({
  header,
  content,
  UserButton,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
  UserButton: React.ReactNode;
}) {
  const pathname = usePathname();
  const category = findBookmarkCategory(pathname);

  const ts = useRef(0);
  const key = useMemo(() => {
    ts.current += 1;
    return `${category}-${ts.current}`;
  }, [category]);

  return (
    <Stack direction="row" sx={{ height: 1, bgcolor: "content.layer2" }}>
      <BookSpine component="nav" UserButton={UserButton} />

      <BoxM
        layout
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
      </BoxM>

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

      <Toaster
        toastOptions={{
          className: "",
          style: {
            background: "var(--mui-palette-SnackbarContent-bg)",
            color: "var(--mui-palette-SnackbarContent-color)",
          },
        }}
      />
    </Stack>
  );
}
