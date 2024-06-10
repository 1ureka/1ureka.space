"use client";

import { Container, Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo, useRef } from "react";
import { PaperM } from "@/components/Motion";
import { AnimatePresence } from "framer-motion";
import BookSpine from "@/components/(bookSpine)/BookSpine";

function usePageKey() {
  const pathname = usePathname();
  const rootPath = pathname.match(/^\/\w+/)?.[0];
  const ts = useRef(0);
  const key = useMemo(() => {
    ts.current += 1;
    return ts.current + `key${rootPath}`;
  }, [rootPath, ts]);

  return key;
}

export default function Layout({
  header,
  content,
}: Readonly<{
  header: React.ReactNode;
  content: React.ReactNode;
}>) {
  const key = usePageKey();

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
            {header}
            {/* booksmar k*/}
            <div>{key}</div>
            {content}
          </PaperM>
        </AnimatePresence>
      </Container>
    </Stack>
  );
}
