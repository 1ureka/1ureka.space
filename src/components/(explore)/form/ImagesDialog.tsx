"use client";

import type { ImageMetadata } from "@/data/type";

import { Grid, Dialog, Typography } from "@mui/material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { BoxM, GridM, DialogTitleM } from "@/components/Motion";
import { DialogContentM } from "@/components/Motion";
import { ImageCard } from "..";

type ImageDialogProps = {
  open: boolean;
  onClose: (id: string | undefined) => void;
  metadataList: ImageMetadata[];
};

export default function DeleteForm({
  open,
  onClose,
  metadataList,
}: ImageDialogProps) {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      PaperProps={{ sx: { overflow: "hidden" } }}
    >
      <DialogTitleM layout>Choose An Image</DialogTitleM>

      <BoxM layout sx={{ position: "absolute", inset: "0 0 auto auto" }}>
        <IconButton
          sx={{ mt: 1.5, mr: 1.5 }}
          onClick={() => onClose(undefined)}
        >
          <CloseRoundedIcon fontSize="small" sx={{ color: "grey.500" }} />
        </IconButton>
      </BoxM>

      <DialogContentM
        sx={{ display: "grid", gap: 4, scrollbarGutter: "stable both-edges" }}
        dividers
        layout
      >
        <TextField
          variant="filled"
          label="Search"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {metadataList.length === 0 ? (
          <BoxM layout sx={{ display: "grid", placeItems: "center" }}>
            <Typography variant="subtitle2" sx={{ p: 2.5 }}>
              Please try a different search.
            </Typography>
          </BoxM>
        ) : (
          <Grid container columns={2} spacing={3}>
            {metadataList.map((metadata) => (
              <GridM item layout xs={2} md={1} key={metadata.id}>
                <BoxM initial="initial" animate="animate">
                  <ImageCard metadata={metadata} onClick={onClose} />
                </BoxM>
              </GridM>
            ))}
          </Grid>
        )}
      </DialogContentM>
    </Dialog>
  );
}
