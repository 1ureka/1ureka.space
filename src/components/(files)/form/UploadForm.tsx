"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createMetadataWithFileSchema } from "@/schema/schema";

import { useState } from "react";
import toast from "react-hot-toast";
import Link, { type LinkProps } from "next/link";
import { uploadImages } from "@/utils/server-actions";

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
  const uploadSchema = createMetadataWithFileSchema(names);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof uploadSchema>>({
    // resolver: zodResolver(uploadSchema),
    defaultValues: { fieldArray: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fieldArray",
  });

  const [loading, setLoading] = useState(false);

  const onValid = (data: z.infer<typeof uploadSchema>) => {
    setLoading(true);

    const files = new FormData();
    const fieldArray = data.fieldArray.map(
      ({ category, group, name, file }, index) => {
        files.append(index.toString(), file);
        return { category, group, name };
      }
    );

    toast
      .promise(
        uploadImages({ fieldArray }, files),
        {
          loading: "Saving changes...",
          success: "Changes saved successfully!",
          error: "Error when submitting",
        },
        {
          style: { minWidth: "25rem" },
        }
      )
      .then((data) => {
        const error = data?.error ?? [];
        error.map((message) => toast.error(message));

        setLoading(false);
      });
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
        <Button type="submit" disabled={fields.length === 0 || loading}>
          Save Change
        </Button>
      </DialogActionsM>
    </Dialog>
  );
}
