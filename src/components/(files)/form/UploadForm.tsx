"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createMetadataWithFileSchema } from "@/schema/metadataSchema";

import toast from "react-hot-toast";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { uploadImage, verifyUpload } from "@/utils/server-actions";
import { trackProgress, isArrayNotEmpty } from "@/utils/utils";
import { compressImage } from "@/utils/client-utils";

import { Button, Grid, IconButton, Dialog } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { BoxM, GridM, DialogTitleM } from "@/components/Motion";
import { DialogActionsM, DialogContentM } from "@/components/Motion";
import UploadField from "../input/UploadField";
import FileDropField from "../input/FileDropField";

interface UploadFormProps {
  open: boolean;
  closeHref: LinkProps["href"];
  names: string[];
}

export default function UploadForm({
  open,
  closeHref,
  names,
}: UploadFormProps) {
  const router = useRouter();
  const uploadSchema = createMetadataWithFileSchema(names);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: { fieldArray: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fieldArray",
  });

  const onValid = async (data: z.infer<typeof uploadSchema>) => {
    if (isSubmitting) return;

    //
    // 獲取表單數據
    const { fieldArray } = data;
    const totalCount = fieldArray.length;
    const filesList = fieldArray.map(({ file }) => file);
    const metadataList = fieldArray.map(({ category, group, name }) => ({
      category,
      group,
      name,
    }));

    if (!isArrayNotEmpty(metadataList)) {
      toast.error("No files to upload");
      return;
    }

    try {
      //
      // 驗證元數據
      toast.loading(`Verifing metadata`, {
        style: { minWidth: "20rem" },
        id: "submit",
      });
      const result = await verifyUpload({ fieldArray: metadataList });

      if (result?.error) {
        toast.dismiss("submit");
        result.error.map((message) => toast.error(message));
        return;
      }

      //
      // 壓縮圖片並且檢查每張圖片的大小
      toast.loading(`Compressing Files... (0 / ${totalCount})`, {
        id: "submit",
      });

      const compressedFiles = await trackProgress(
        filesList.map((file) =>
          compressImage(file, { type: "webp", maxSize: 4 * 1024 * 1024 })
        ),
        (_, done) =>
          toast.loading(`Compressing Files... (${done + 1} / ${totalCount})`, {
            id: "submit",
          })
      );

      if (!compressedFiles.every(({ size }) => size <= 4 * 1024 * 1024)) {
        toast.error("Some file size exceeds 4 MB", { id: "submit" });
        return;
      }

      //
      // 上傳圖片
      toast.loading(`Saving changes... (0 / ${totalCount})`, { id: "submit" });

      const uploadPromises = compressedFiles.map((file, index) => {
        const metadata = metadataList[index];
        const formData = new FormData();
        formData.append("file", file);

        return uploadImage(metadata, formData);
      });

      const res = await trackProgress(uploadPromises, (_, done) =>
        toast.loading(`Saving changes... (${done + 1} / ${totalCount})`, {
          id: "submit",
        })
      );

      //
      // 處理上傳結果
      if (res.every((r) => r.success)) {
        toast.success("Changes saved successfully!", { id: "submit" });

        (async () => {
          reset({ fieldArray: [] });
          router.refresh();
        })();
      } else {
        toast.dismiss("submit");

        res.forEach((r, index) => {
          if (!r.success) toast.error(`Failed to upload image ${index + 1}`);
        });
      }
    } catch {
      toast.error("Something went wrong", { id: "submit" });
    }
  };

  const onInvalid = () => {
    toast.error("Uh oh! There are a few errors in the form.");
  };

  const onAppend = (files: File[]) => {
    files.forEach((file) =>
      append({
        category: "scene",
        name: file.name,
        group: file.name,
        file: file,
      })
    );
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onTransitionExited={() => remove()}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onValid, onInvalid),
        sx: { overflow: "hidden" },
      }}
    >
      <DialogTitleM layout>Upload Files</DialogTitleM>

      <BoxM layout sx={{ position: "absolute", inset: "0 0 auto auto" }}>
        <Link href={closeHref}>
          <IconButton sx={{ mt: 1.5, mr: 1.5 }}>
            <CloseRoundedIcon fontSize="small" sx={{ color: "grey.500" }} />
          </IconButton>
        </Link>
      </BoxM>

      <DialogContentM
        sx={{ display: "grid", gap: 4, scrollbarGutter: "stable both-edges" }}
        dividers
        layout
      >
        {fields.length > 0 && (
          <Grid container columns={2} spacing={3}>
            {fields.map((field, index) => (
              <GridM item layout xs={2} md={1} key={field.id}>
                <BoxM initial="initial" animate="animate">
                  <UploadField
                    index={index}
                    field={field}
                    errors={errors}
                    register={register}
                    remove={remove}
                    disabled={isSubmitting}
                  />
                </BoxM>
              </GridM>
            ))}
          </Grid>
        )}
        <FileDropField onAppend={onAppend} />
      </DialogContentM>

      <DialogActionsM layout>
        <Button
          type="button"
          onClick={() => reset({ fieldArray: [] })}
          disabled={!isDirty || isSubmitting}
        >
          reset form
        </Button>
        <Button type="submit" disabled={fields.length === 0 || isSubmitting}>
          Save Change
        </Button>
      </DialogActionsM>
    </Dialog>
  );
}
