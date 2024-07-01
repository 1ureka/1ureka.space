"use client";

import { Typography, Switch } from "@mui/material";
import { FormControl, FormControlLabel, FormHelperText } from "@mui/material";

export default function DryModeSwitch() {
  return (
    <FormControl variant="standard">
      <FormControlLabel control={<Switch size="small" />} label={"dry mode"} />
      <FormHelperText>
        <Typography variant="caption">
          Simulates actions without affecting backend data.
        </Typography>
      </FormHelperText>
    </FormControl>
  );
}
