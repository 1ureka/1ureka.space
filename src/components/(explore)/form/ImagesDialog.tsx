"use client";

import { useState } from "react";
import type { ImageMetadata } from "@/data/type";
import { useExploreSearch } from "@/hooks";

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

export default function ImageDialog({
  open,
  onClose,
  metadataList,
}: ImageDialogProps) {
  const [search, setSearch] = useState("");
  const filteredMetadataList = useExploreSearch(search, metadataList);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      PaperProps={{ sx: { overflow: "hidden" } }}
      onClose={() => onClose(undefined)}
    >
      <DialogTitleM
        layout
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <Typography sx={{ whiteSpace: "nowrap" }} variant="h6" component="span">
          Select Image
        </Typography>

        <TextField
          variant="filled"
          label="Search"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <IconButton onClick={() => onClose(undefined)}>
          <CloseRoundedIcon fontSize="small" sx={{ color: "grey.500" }} />
        </IconButton>
      </DialogTitleM>

      <DialogContentM
        sx={{
          display: "grid",
          gap: 4,
          scrollbarGutter: "stable both-edges",
          minHeight: 375,
        }}
        dividers
        layout
      >
        {filteredMetadataList.length === 0 ? (
          <BoxM layout sx={{ display: "grid", placeItems: "center" }}>
            <Typography variant="subtitle2" sx={{ p: 2.5 }}>
              Please try a different search.
            </Typography>
          </BoxM>
        ) : (
          <Grid container columns={2} spacing={3}>
            {filteredMetadataList.map((metadata) => (
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
