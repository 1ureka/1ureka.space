import { Badge as MuiBadge, Stack } from "@mui/material";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";

export default function Badge({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  return (
    <MuiBadge
      badgeContent={
        <Stack direction="row" alignItems="center" gap={0.5}>
          <PhotoLibraryRoundedIcon sx={{ fontSize: 15, pb: 0.3 }} />
          {count}
        </Stack>
      }
      color="primary"
      sx={{ width: 1, height: 1 }}
    >
      {children}
    </MuiBadge>
  );
}
