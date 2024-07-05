"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { createUploadSchema } from "@/schema/uploadSchema";

import Link, { type LinkProps } from "next/link";
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
  const uploadSchema = createUploadSchema(names);
  const { register, control, handleSubmit, formState } = useForm<
    z.infer<typeof uploadSchema>
  >({
    defaultValues: { upload: [] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "upload",
  });

  const onSubmit = (data: z.infer<typeof uploadSchema>) => {
    try {
      uploadSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.errors); // 印出詳細錯誤訊息
        // 這裡可以根據錯誤訊息做客製化處理，例如顯示給使用者
      }
    }
    // remove()
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
      PaperProps={{ component: "form", onSubmit: handleSubmit(onSubmit) }}
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
        {/* <Button type="submit" disabled={fields.length === 0}>
          Save Change
        </Button> */}
        <Button type="submit">Save Change</Button>
      </DialogActionsM>
    </Dialog>
  );
}
