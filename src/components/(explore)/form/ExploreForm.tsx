"use client";

import { BoxM, DividerM, StackM } from "@/components/Motion";
import { opacityVar, yScaleVar, yVar } from "@/components/MotionProps";

import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { Button, Fab, TextField } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

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
            gridTemplateRows: "1fr auto 1fr 1fr",
            placeItems: "start stretch",
            flexGrow: 1,
            gap: 3,
          }}
        >
          <StackM variants={yScaleVar}>
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
          </StackM>

          <DividerM variants={yVar} sx={{ height: "0px" }} />

          <StackM variants={yScaleVar}>
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
          </StackM>

          <StackM variants={yScaleVar}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="subtitle1">Points: </Typography>
              <Typography variant="caption">{"( 0 / 3 )"}</Typography>
            </Stack>

            <Typography variant="caption" color="error.main">
              * Some Points are missing.
            </Typography>
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
        </Box>
      </BoxM>
    </Box>
  );
}
