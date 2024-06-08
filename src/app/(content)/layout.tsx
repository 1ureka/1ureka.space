"use client";

import TestNav from "@/components/TestNav";
import { Container } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { PaperM } from "@/components/Motion";
import { AnimatePresence } from "framer-motion";

const keys = [];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const rootPath = pathname.match(/^\/\w+/)?.[0];
  const key = useMemo(() => {
    keys.push(0);
    return keys.length;
  }, [rootPath]);

  return (
    <div>
      {/* bookSpine */}
      <TestNav />
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
            {/* booksmark */}
            <div>{key}</div>
            {children}
          </PaperM>
        </AnimatePresence>
      </Container>
    </div>
  );
}
