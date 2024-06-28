"use client";

import { useEffect, useRef, useState } from "react";
import { blobGetDataUrl, decode, delay } from "@/utils/client-utils";

export function useBlob(blob: Blob | undefined) {
  const [src, setSrc] = useState<string | null>("");

  useEffect(() => {
    const callback = () => setSrc(null);

    if (!blob) return callback;

    (async () => {
      const url = await blobGetDataUrl(blob);
      if (typeof url !== "string") return callback;
      setSrc(url);
    })();

    return callback;
  }, [blob]);

  return src;
}

export function useDecode(src: string | null): [string, boolean] {
  const [state, setState] = useState(false);
  const [_src, setSrc] = useState("");
  const timeStamp = useRef<number | null>(null);

  const decoding = (url: string, createAt: number) => {
    const img = new Image();
    img.src = url;

    (async () => {
      await delay(250);
      await decode(img);
      if (createAt !== timeStamp.current) return;
      setSrc(url);
      setState(true);
    })();
  };

  useEffect(() => {
    timeStamp.current = Date.now();
    setState(false);
    if (src) decoding(src, timeStamp.current);
  }, [src]);

  return [_src, state];
}

export function useDropArea(onDrop: (files: FileList) => void) {
  const [isDragOver, setDragOver] = useState(false);

  const handleDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop: React.DragEventHandler = (e) => {
    e.preventDefault();
    setDragOver(false);
    onDrop(e.dataTransfer.files);
  };

  const DropProps = {
    onDrop: handleDrop,
    onDragOver: handleDragOver,
    onDragEnter: () => setDragOver(true),
    onDragLeave: (e: React.DragEvent) => {
      const relatedTarget = e.relatedTarget as Node | null;
      if (e.currentTarget.contains(relatedTarget)) return;
      setDragOver(false);
    },
  };

  return { isDragOver, DropProps };
}
