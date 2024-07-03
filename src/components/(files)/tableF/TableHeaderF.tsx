import { Button, Skeleton, Stack, Typography } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export function TableHeaderF() {
  return (
    <Stack
      direction="row"
      sx={{ p: 1.5, pl: 2.5 }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Skeleton>
        <Typography variant="subtitle1">0 selected</Typography>
      </Skeleton>

      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Skeleton>
          <Button startIcon={<DeleteRoundedIcon fontSize="small" />}>
            Modify
          </Button>
        </Skeleton>

        <Skeleton>
          <Button startIcon={<DeleteRoundedIcon fontSize="small" />}>
            Delete
          </Button>
        </Skeleton>
      </Stack>
    </Stack>
  );
}
