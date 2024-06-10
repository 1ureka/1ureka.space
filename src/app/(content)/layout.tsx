"use client";

import { useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Container, Stack } from "@mui/material";

import { PaperM } from "@/components/Motion";
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
    if (rootPath in bookmarks) return bookmarks[rootPath];
    return [];
  }, [rootPath]);

  return (
    <Stack direction="row" sx={{ height: 1 }}>
      <BookSpine />

      <Container>
        <AnimatePresence mode="wait">
          <PaperM
            key={key}
            elevation={5}
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            sx={{ p: 5 }}
          >
            <Bookmarks options={options} />
            {header}
            {content}
          </PaperM>
        </AnimatePresence>
      </Container>
    </Stack>
  );
}
