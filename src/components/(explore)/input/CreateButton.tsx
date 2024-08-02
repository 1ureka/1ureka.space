import { Fab, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { StackM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import { NextLinkComposed } from "@/components/Link";

export default function CreateButton() {
  return (
    <StackM gap={1} alignItems="center" variants={yScaleVar}>
      <Fab
        color="primary"
        size="medium"
        component={NextLinkComposed}
        to={"/explore/new"}
      >
        <AddRoundedIcon />
      </Fab>
      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
        Create New
      </Typography>
    </StackM>
  );
}
