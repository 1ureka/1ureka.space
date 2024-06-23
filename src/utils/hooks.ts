"use client";

import { useEffect, useRef, useState } from "react";
import { blobGetDataUrl, createFilter, decode, delay } from "./client-utils";
import { EDITOR_FILES, EDITOR_VALS } from "@/context/store";
import { useRecoilValue } from "recoil";

//
// general
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

//
// page
export function useEditorPreview() {
  const editorOptions = useRecoilValue(EDITOR_VALS);
  const fileList = useRecoilValue(EDITOR_FILES);
  const file = fileList.find((item) => item.display)?.file;
  const name = file ? file.name : "";

  // preview dataUrl
  const [previewUrl, setDataUrl] = useState<string | null>(null);
  const { maxSize, scale, type } = editorOptions;
  useEffect(() => {
    let lastTrigger = true;

    const callback = () => {
      lastTrigger = false;
      setDataUrl(null);
    };

    if (!file) return callback;

    (async () => {
      await delay(500);
      if (!lastTrigger) return;

      // const blob = await compressImage(file, {
      //   maxSize: maxSize * 1024 * 1024,
      //   scale,
      //   type,
      // });
      const blob = null;
      if (!blob) return callback;

      const dataUrl = await blobGetDataUrl(blob);
      if (typeof dataUrl !== "string") return callback;
      setDataUrl(dataUrl);
    })();

    return callback;
  }, [file, maxSize, scale, type]);

  // preview filter string
  const { saturate, contrast, exposure } = editorOptions;
  const filterString = createFilter({ saturate, contrast, exposure });

  // origin dataUrl
  const originUrl = useBlob(file);

  return { name, originUrl, previewUrl, filterString };
}
