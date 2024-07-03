import { TableRowM } from "@/components/Motion";
import { xVar } from "@/components/MotionProps";

import { Checkbox, Skeleton, TableBody, Typography } from "@mui/material";
import { TableCell } from "@mui/material";

const imageMetadatas = [
  { name: "landscape1", group: "landscape", size: "2.5MB" },
  { name: "portrait1", group: "portrait", size: "1.8MB" },
  { name: "food1", group: "food", size: "3.2MB" },
  { name: "pet1", group: "pet", size: "2.1MB" },
  { name: "architecture1", group: "architecture", size: "4.0MB" },
];

export function TableBodyF() {
  return (
    <TableBody>
      {imageMetadatas.map(({ name, size }, i) => (
        <TableRowM
          key={name}
          variants={xVar}
          sx={{ backdropFilter: i % 2 ? "" : "brightness(0.85)" }}
        >
          <TableCell padding="checkbox">
            <Checkbox color="primary" size="small" disabled />
          </TableCell>
          <TableCell sx={{ p: 1.5 }}>
            <Skeleton>
              <Typography>{name}</Typography>
            </Skeleton>
          </TableCell>
          <TableCell align="right" sx={{ p: 1.5 }}>
            <Skeleton>
              <Typography>{size}</Typography>
            </Skeleton>
          </TableCell>
        </TableRowM>
      ))}
    </TableBody>
  );
}
