import type { TabsProps, Theme } from "@mui/material";

import { Tabs } from "@mui/material";

export type StyledTabsProps = TabsProps & {
  children: React.ReactNode;
};

export default function StyledTabs({ children, ...props }: StyledTabsProps) {
  const sx = (theme: Theme) => ({
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: theme.vars.palette.primary.main,
    },
  });

  return (
    <Tabs
      {...props}
      sx={sx}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    >
      {children}
    </Tabs>
  );
}
