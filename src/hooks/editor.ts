"use client";

import { useEffect, useState } from "react";
import type { CheckboxProps } from "@mui/material";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { EDITOR_FILES, EDITOR_VALS } from "@/context/store";

import { blobGetDataUrl, delay } from "@/utils/client-utils";
import { createFilter, replaceFileExtension } from "@/utils/client-utils";
import { useBlob } from ".";

export function useEditorInput() {
  const [files, setFiles] = useRecoilState(EDITOR_FILES);
  const fileNames = files.map(({ file }) => file.name);

  const copyName = (fileName: string) => {
    const dotIndex = fileName.lastIndexOf(".");
    const name = fileName.slice(0, dotIndex);
    const extension = fileName.slice(dotIndex + 1);
    return `${name} (copy).${extension}`;
  };

  const action = (fileList: FileList) => {
    const files = Array.from(fileList);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const filteredFiles = imageFiles.map((file) => {
      if (!fileNames.includes(file.name)) return file;
      return new File([file], copyName(file.name), { type: file.type });
    });

    if (filteredFiles.length === 0) return;

    const newFiles = filteredFiles.map((file, i) => ({
      selected: true,
      display: i + 1 === filteredFiles.length,
      file,
    }));

    setFiles((prev) => {
      const prevFiles = prev.map((file) => ({ ...file, display: false }));
      return [...prevFiles, ...newFiles];
    });
  };

  return action;
}

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

export function useEditorSelection() {
  const setFiles = useSetRecoilState(EDITOR_FILES);

  const handleSelectAll: CheckboxProps["onChange"] = ({ target }) => {
    setFiles((prev) =>
      prev.map((file) => ({ ...file, selected: target.checked }))
    );
  };

  const handleSelect = (name: string) => {
    setFiles((prev) =>
      prev.map(({ file, selected, display }) => ({
        file,
        selected: file.name === name ? !selected : selected,
        display,
      }))
    );
  };

  return { handleSelectAll, handleSelect };
}

export function useEditorDisplay() {
  const setFiles = useSetRecoilState(EDITOR_FILES);

  const handleDisplay = (name: string) => {
    setFiles((prev) =>
      prev.map(({ file, selected }) => ({
        file,
        selected,
        display: file.name === name,
      }))
    );
  };

  return { handleDisplay };
}

export function useEditorConversion() {
  const options = useRecoilValue(EDITOR_VALS);
  const [files, setFiles] = useRecoilState(EDITOR_FILES);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);

    const selectedFiles = files.filter(({ selected }) => selected);
    const results = await Promise.all(
      selectedFiles.map(async ({ file }) => {
        // const filtered = await filterImage(file, options);
        // options.maxSize *= 1024 * 1024;
        // const blob = await compressImage(filtered, options);
        // const dataUrl = await blobGetDataUrl(blob);
        await delay(1000);
        return {
          dataUrl: "",
          name: replaceFileExtension(file.name, options.type),
        };
      })
    );

    setFiles((prev) => prev.filter((file) => !file.selected));

    results.forEach(({ dataUrl }) => {
      if (typeof dataUrl !== "string") return;
      // const link = document.createElement("a");
      // link.href = dataUrl;
      // link.download = name;
      // link.click();
    });

    setLoading(false);
  };

  return { handleConvert, loading };
}
