"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createMetadataWithFileSchema } from "@/schema/schema";

import toast from "react-hot-toast";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { uploadImages } from "@/utils/server-actions";
import { isArrayNotEmpty } from "@/utils/utils";
import { compressImage } from "@/utils/client-utils";

import { Button, Grid, IconButton, Dialog } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { BoxM, GridM, DialogTitleM } from "@/components/Motion";
import { DialogActionsM, DialogContentM } from "@/components/Motion";
import { FileDropField, UploadField } from "..";

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

    const totalLength = data.fieldArray.length;

    toast.loading(`Compressing Files... (0 / ${totalLength})`, {
      style: { minWidth: "20rem" },
      id: "submit",
    });

    let totalSize = 0;
    const files = new FormData();

    for (const [index, { file }] of data.fieldArray.entries()) {
      const compressedFile = await compressImage(file, {
        type: "webp",
        maxSize: 3 * 1024 * 1024,
      });

      totalSize += compressedFile.size;

      if (totalSize > 4 * 1024 * 1024) {
        toast.error(
          `Total file size ${(totalSize / 1024 / 1024).toFixed(
            2
          )} MB exceeds 4 MB`,
          { id: "submit" }
        );
        return;
      }

      files.append(index.toString(), compressedFile);

      toast.loading(`Compressing Files... (${index + 1} / ${totalLength})`, {
        id: "submit",
      });
    }

    toast.loading(
      `Saving changes... (${(totalSize / 1024 / 1024).toFixed(2)} MB)`,
      { id: "submit" }
    );

    const fieldArray = data.fieldArray.map(({ category, group, name }) => ({
      category,
      group,
      name,
    }));

    if (!isArrayNotEmpty(fieldArray)) {
      toast.error("No files to upload", { id: "submit" });
      return;
    }

    try {
      const result = await uploadImages({ fieldArray }, files);
      const error = result?.error ?? [];

      if (error.length === 0) {
        toast.success("Changes saved successfully!", { id: "submit" });
        (async () => {
          reset({ fieldArray: [] });
          router.refresh();
        })();
      } else {
        toast.dismiss("submit");
        error.map((message) => toast.error(message));
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
