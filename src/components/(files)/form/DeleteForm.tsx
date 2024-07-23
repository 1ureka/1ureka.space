"use client";

import type { ImageMetadata } from "@/data/type";
import { useRecoilState } from "recoil";
import { FILES_SELECTED } from "@/context/store";

import { useState } from "react";
import toast from "react-hot-toast";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { deleteImages } from "@/utils/server-actions";

import { Button, Grid, IconButton, Dialog, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { BoxM, GridM, DialogTitleM } from "@/components/Motion";
import { DialogActionsM, DialogContentM } from "@/components/Motion";
import { DeleteField } from "..";

interface DeleteFormProps {
  open: boolean;
  closeHref: LinkProps["href"];
  metadataList: ImageMetadata[];
}

export default function DeleteForm({
  open,
  closeHref,
  metadataList,
}: DeleteFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selected, setSelected] = useRecoilState(FILES_SELECTED);
  const selectedMetadata = metadataList.filter(({ name }) =>
    selected.includes(name)
  );

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    toast.loading("Saving changes...", {
      style: { minWidth: "20rem" },
      id: "submit",
    });

    try {
      const ids = selectedMetadata.map(({ id }) => id);
      const result = await deleteImages(ids);
      const error = result?.error ?? [];

      if (error.length === 0) {
        toast.success("Changes saved successfully!", { id: "submit" });
        setSelected([]);

        router.refresh();
      } else {
        toast.dismiss("submit");
        error.map((message) => toast.error(message));
      }
    } catch {
      toast.error("Something went wrong", { id: "submit" });
    }

    setIsSubmitting(false);
  };

  const createHandleCancel = (name: string) => () => {
    setSelected((prev) => prev.filter((prevName) => prevName !== name));
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      PaperProps={{ sx: { overflow: "hidden" } }}
    >
      <DialogTitleM layout>Delete Files</DialogTitleM>

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
        {selectedMetadata.length === 0 ? (
          <BoxM layout sx={{ display: "grid", placeItems: "center" }}>
            <Typography variant="subtitle2" sx={{ p: 2.5 }}>
              There is no file selected.
            </Typography>
          </BoxM>
        ) : (
          <Grid container columns={2} spacing={3}>
            {selectedMetadata.map((metadata) => (
              <GridM item layout xs={2} md={1} key={metadata.id}>
                <BoxM initial="initial" animate="animate">
                  <DeleteField
                    metadata={metadata}
                    onRemove={createHandleCancel(metadata.name)}
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
          disabled={selected.length === 0 || isSubmitting}
          onClick={handleSubmit}
        >
          Save Change
        </Button>
      </DialogActionsM>
    </Dialog>
  );
}
