import type { TabProps, Theme } from "@mui/material";
import { Tab } from "@mui/material";

interface StyledTabProps extends TabProps {
  to: string;
}

export default function StyledTab({ ...props }: StyledTabProps) {
  const sx = (theme: Theme) => ({
    // font
    textTransform: "none",
    fontWeight: 400,
    // color
    backgroundColor: theme.vars.palette.content.layer3,
    "&.Mui-selected": {
      backgroundColor: theme.vars.palette.content.layer1,
    },
    // hover
    paddingBottom: "30px",
    bottom: "-20px",
    "&:hover": {
      bottom: "-10px",
    },
    // other
    borderRadius: "15px 15px 0 0",
    marginRight: theme.spacing(0.5),
    transition: "all 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28)",
  });

  return <Tab {...props} sx={sx} />;
}
