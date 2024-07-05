"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { FILES_DIALOG } from "@/context/store";

import { Button, Grid, IconButton } from "@mui/material";
import { Dialog as MuiDialog } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { BoxM, GridM, DialogTitleM } from "@/components/Motion";
import { DialogActionsM, DialogContentM } from "@/components/Motion";
import { FileDropField, UploadField } from "..";

export interface ImageField {
  data: {
    category: "scene" | "props";
    name: string;
    group: string;
    file: Blob;
  }[];
}

export default function Dialog() {
  const [{ open }, setDialog] = useRecoilState(FILES_DIALOG);
  const handleClose = () => setDialog((prev) => ({ ...prev, open: false }));

  const { register, control, handleSubmit, formState } = useForm<ImageField>({
    defaultValues: { data: [] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
  });

  const onSubmit = ({ data }: ImageField) => {
    console.log(data);
    handleClose();
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
    <MuiDialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      onTransitionExited={() => remove()}
      PaperProps={{ component: "form", onSubmit: handleSubmit(onSubmit) }}
    >
      <DialogTitleM layout>Upload Files</DialogTitleM>

      <BoxM layout sx={{ position: "absolute", inset: "0 0 auto auto" }}>
        <IconButton onClick={handleClose} sx={{ mt: 1.5, mr: 1.5 }}>
          <CloseRoundedIcon fontSize="small" sx={{ color: "grey.500" }} />
        </IconButton>
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
        <Button type="submit" disabled={fields.length === 0}>
          Save Change
        </Button>
      </DialogActionsM>
    </MuiDialog>
  );
}
