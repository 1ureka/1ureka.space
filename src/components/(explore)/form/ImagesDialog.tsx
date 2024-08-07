"use client";

import { useEffect, useState } from "react";
import type { ImageMetadata } from "@/data/type";
import Fuse from "fuse.js";
import { delay } from "@/utils/client-utils";

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
  const [search, setSearch] = useState("");
  const [filteredMetadataList, setFilteredMetadataList] =
    useState(metadataList);

  useEffect(() => {
    if (search === "") {
      setFilteredMetadataList(metadataList);
      return;
    }

    let current = true;
    (async () => {
      await delay(250);
      if (!current) return;
      const fuse = new Fuse(metadataList, { keys: ["name"] });
      const result = fuse.search(search);
      setFilteredMetadataList(result.map((r) => r.item));
    })();

    return () => {
      current = false;
    };
  }, [search, metadataList]);

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
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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
