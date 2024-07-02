import { Checkbox, Skeleton, Typography } from "@mui/material";
import { TableCell, TableHead, TableRow } from "@mui/material";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "File name",
  },
  {
    id: "size",
    numeric: true,
    disablePadding: false,
    label: "Size (KB)",
  },
];

export function TableHeadF() {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" size="small" disabled />
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sx={{ p: 1.5 }}
          >
            <Skeleton>
              <Typography>{headCell.label}</Typography>
            </Skeleton>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
