"use client";

import { useEffect, useRef, useState } from "react";
import { blobGetDataUrl, decode, delay } from "@/utils/client-utils";

/**
 * 用於從 Blob 物件取得資料 URL。
 */
export function useBlob(blob: Blob | undefined) {
  const [src, setSrc] = useState<string | null>(null);

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

/**
 * 用於從資料 URL 解碼圖片。
 */
export function useDecode(dataUrl: string | null): [string, boolean] {
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
    if (dataUrl) decoding(dataUrl, timeStamp.current);
  }, [dataUrl]);

  return [_src, state];
}

/**
 * 自定義 hook，用於管理檔案拖放區域。
 * @returns 一個物件，包含 `isDragOver` 狀態（表示是否有檔案在區域上方）和 `DropProps` 物件（用於設定拖放區域元素的屬性）。
 */
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
