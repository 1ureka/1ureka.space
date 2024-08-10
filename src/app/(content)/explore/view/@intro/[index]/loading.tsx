import { Stack, Typography, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Stack gap={0.5}>
      <Skeleton variant="text" animation="wave">
        <Typography variant="h4">Explore Name</Typography>
      </Skeleton>

      <Skeleton variant="text" animation="wave">
        <Typography variant="subtitle2" sx={{ fontStyle: "italic" }}>
          {`From "Artwork"`}
        </Typography>
      </Skeleton>

      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ width: 1, height: "0.75rem", mt: 1.5 }}
      />
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ width: 1, height: "0.75rem", mt: 1 }}
      />
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ width: 0.6, height: "0.75rem", mt: 1 }}
      />
    </Stack>
  );
}
