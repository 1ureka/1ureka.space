"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createMetadataWithIdSchema } from "@/schema/metadataSchema";
import type { ImageMetadata } from "@/data/type";

import toast from "react-hot-toast";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { updateImages } from "@/utils/server-actions";

import { Button, Grid, IconButton, Dialog, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { BoxM, GridM, DialogTitleM } from "@/components/Motion";
import { DialogActionsM, DialogContentM } from "@/components/Motion";
import ModifyField from "../input/ModifyField";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FILES_SELECTED } from "@/context/store";

interface ModifyFormProps {
  open: boolean;
  closeHref: LinkProps["href"];
  metadataList: ImageMetadata[];
}

const generateFieldArray = (names: string[], metadataList: ImageMetadata[]) => {
  const fieldArray = [];

  for (const name of names) {
    const metadata = metadataList.find((metadata) => metadata.name === name);

    if (metadata) {
      fieldArray.push({
        cuid: metadata.id,
        category: metadata.category as "scene" | "props",
        name: metadata.name,
        group: metadata.group,
      });
    }
  }

  return fieldArray;
};

export default function ModifyForm({
  open,
  closeHref,
  metadataList,
}: ModifyFormProps) {
  const [selected, setSelected] = useRecoilState(FILES_SELECTED);
  const names = metadataList
    .map(({ name }) => name)
    .filter((name) => !selected.includes(name));

  const updateSchema = createMetadataWithIdSchema(names);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    reset,
  } = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: { fieldArray: [] },
  });

  useEffect(() => {
    reset({ fieldArray: generateFieldArray(selected, metadataList) });
  }, [selected, metadataList, reset]);

  const { fields } = useFieldArray({
    control,
    name: "fieldArray",
  });

  const onValid = async (data: z.infer<typeof updateSchema>) => {
    if (isSubmitting) return;

    toast.loading("Saving changes...", {
      style: { minWidth: "20rem" },
      id: "submit",
    });

    try {
      const result = await updateImages(data);
      const error = result?.error ?? [];

      if (error.length === 0) {
        toast.success("Changes saved successfully!", { id: "submit" });
        (async () => {
          reset({ fieldArray: [] });
          setSelected([]);

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

  let dirtyArray: boolean[];
  if (dirtyFields?.fieldArray) {
    dirtyArray = dirtyFields.fieldArray.map((field) => {
      return !!field;
    });
  } else {
    dirtyArray = Array(fields.length).fill(false);
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onValid, onInvalid),
        sx: { overflow: "hidden" },
      }}
    >
      <DialogTitleM layout>Modify Files</DialogTitleM>

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
        {fields.length === 0 ? (
          <BoxM layout sx={{ display: "grid", placeItems: "center" }}>
            <Typography variant="subtitle2" sx={{ p: 2.5 }}>
              There is no file selected.
            </Typography>
          </BoxM>
        ) : (
          <Grid container columns={2} spacing={3}>
            {fields.map((field, index) => (
              <GridM item layout xs={2} md={1} key={field.id}>
                <BoxM initial="initial" animate="animate">
                  <ModifyField
                    index={index}
                    field={field}
                    errors={errors}
                    register={register}
                    isDirty={dirtyArray[index]}
                    disabled={isSubmitting}
                  />
                </BoxM>
              </GridM>
            ))}
          </Grid>
        )}
      </DialogContentM>

      <DialogActionsM layout>
        <Button
          type="button"
          onClick={() =>
            reset({ fieldArray: generateFieldArray(selected, metadataList) })
          }
          disabled={!isDirty || isSubmitting}
        >
          reset form
        </Button>
        <Button type="submit" disabled={!isDirty || isSubmitting}>
          Save Change
        </Button>
      </DialogActionsM>
    </Dialog>
  );
}
