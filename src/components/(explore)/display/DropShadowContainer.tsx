import { Box } from "@mui/material";

export default function DropShadowContainer({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: React.ComponentProps<typeof Box>["sx"];
}) {
  const gradient = "drop-shadow(0 0 20px var(--mui-palette-content-layer2))";
  return (
    <Box sx={{ ...sx, filter: `${gradient} ${gradient}` }}>{children}</Box>
  );
}
