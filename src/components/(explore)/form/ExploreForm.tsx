"use client";

import { BoxM, DividerM, StackM } from "@/components/Motion";
import { opacityVar, yScaleVar, yVar } from "@/components/MotionProps";

import { Radio, Skeleton } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";
import { Button, Fab, TextField, IconButton } from "@mui/material";

import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddLocationRoundedIcon from "@mui/icons-material/AddLocationRounded";
import EditLocationAltRoundedIcon from "@mui/icons-material/EditLocationAltRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { Point } from "@/components/(explore)";

export default function ExploreForm() {
  return (
    <Box
      component="form"
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "minmax(325px, 0.5fr) 1fr",
        gap: 4.5,
      }}
    >
      <StackM variants={yScaleVar} gap={1.5}>
        <BoxM variants={yScaleVar}>
          <TextField
            label="Explore name"
            variant="filled"
            type="text"
            size="small"
            fullWidth
          />
        </BoxM>

        <BoxM variants={yScaleVar}>
          <Typography variant="subtitle1">Description: </Typography>
          <TextField
            variant="filled"
            size="small"
            fullWidth
            multiline
            minRows={4}
            maxRows={4}
            placeholder="Start with a new View. Each View needs at least one Variant and Points equal to the View count minus one within the Explore."
          />
        </BoxM>

        <Box
          sx={{
            display: "grid",
            gridTemplateRows:
              "minmax(100px, auto) auto minmax(100px, auto) minmax(100px, auto)",
            placeItems: "start stretch",
            flexGrow: 1,
            gap: 3,
          }}
        >
          <StackM variants={yScaleVar}>
            <Box>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="subtitle1">Views: </Typography>
                <Button startIcon={<AddBoxRoundedIcon />} size="small">
                  <Typography variant="body1" color="inherit">
                    Add
                  </Typography>
                </Button>
              </Stack>

              <Typography variant="caption" color="error.main">
                * At least one View is required.
              </Typography>
            </Box>

            <Stack gap={1}>
              <ViewField checked />
            </Stack>
          </StackM>

          <DividerM variants={yVar} sx={{ height: "0px" }} />

          <StackM variants={yScaleVar}>
            <Box>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="subtitle1">Variants: </Typography>
                <Button startIcon={<AddBoxRoundedIcon />} size="small">
                  <Typography variant="body1" color="inherit">
                    Add
                  </Typography>
                </Button>
              </Stack>

              <Typography variant="caption" color="error.main">
                * At least one Variant is required.
              </Typography>
            </Box>

            <Stack gap={1}>
              <VariantField checked />
              <VariantField checked={false} />
            </Stack>
          </StackM>

          <StackM variants={yScaleVar}>
            <Box>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="subtitle1">Points: </Typography>
                <Typography variant="caption">{"( 0 / 3 )"}</Typography>
              </Stack>

              <Typography variant="caption" color="error.main">
                * Some Points are missing.
              </Typography>
            </Box>

            <Stack gap={1}>
              <PointField from="View 1" to="View 2" type="edit" />
              <PointField from="View 1" to="View 3" type="add" />
            </Stack>
          </StackM>
        </Box>
      </StackM>

      <BoxM variants={opacityVar}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            width: 1,
            height: "auto",
            aspectRatio: 16 / 9,
          }}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ width: 1, height: 1 }}
          />
          <Fab
            type="submit"
            variant="extended"
            color="primary"
            sx={{
              position: "absolute",
              inset: "auto 0 0 auto",
              translate: "0 50%",
              mr: 2,
              gap: 1,
            }}
          >
            <SaveRoundedIcon /> Save
          </Fab>

          <Point
            color="var(--mui-palette-secondary-dark)"
            name="To View 2"
            sx={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        </Box>
      </BoxM>
    </Box>
  );
}

function PointField({
  from,
  to,
  type,
}: {
  from: string;
  to: string;
  type: "add" | "edit";
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto 1fr auto",
        placeItems: "center",
        gap: 1,
        borderRadius: 1,
        border: "2px solid",
        borderColor: "divider",
        p: 0.5,
        px: 1,
      }}
    >
      <Box sx={{ p: 0.65, bgcolor: "secondary.dark", borderRadius: "50%" }} />

      <Typography>{from}</Typography>
      <ChevronRightRoundedIcon color="action" />
      <Typography>{to}</Typography>

      <IconButton size="small">
        {type === "add" ? (
          <AddLocationRoundedIcon fontSize="small" />
        ) : (
          <EditLocationAltRoundedIcon fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
}

function VariantField({ checked }: { checked: boolean }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 0.15fr 0.15fr",
        placeItems: "center end",
        borderRadius: 1,
        border: "2px solid",
        borderColor: "divider",
        pr: 1,
      }}
    >
      <Stack direction="row" sx={{ width: 1 }}>
        <TextField size="small" variant="filled" label="name" fullWidth />
        <TextField size="small" variant="filled" label="group" fullWidth />
      </Stack>

      <IconButton size="small">
        <DeleteOutlineRoundedIcon fontSize="small" />
      </IconButton>

      <Radio checked={checked} size="small" sx={{ p: 0.5 }} />
    </Box>
  );
}

function ViewField({ checked }: { checked: boolean }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 0.15fr 0.15fr",
        placeItems: "center end",
        borderRadius: 1,
        border: "2px solid",
        borderColor: "divider",
        pr: 1,
      }}
    >
      <TextField size="small" variant="filled" label="name" fullWidth />
      <IconButton size="small">
        <DeleteOutlineRoundedIcon fontSize="small" />
      </IconButton>
      <Radio checked={checked} size="small" sx={{ p: 0.5 }} />
    </Box>
  );
}
