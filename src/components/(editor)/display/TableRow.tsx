import { Checkbox, Box, TableCell } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import { TableRowM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

function CellSelectBox({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick: () => void;
}) {
  const handleClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <TableCell padding="checkbox">
      <Checkbox
        color="primary"
        checked={checked}
        size="small"
        onClick={handleClick}
      />
    </TableCell>
  );
}

function CellName({ name, isDisplay }: { name: string; isDisplay: boolean }) {
  return (
    <TableCell
      padding="none"
      align="center"
      sx={(theme) => ({
        color: isDisplay ? theme.vars.palette.primary.main : "",
        overflow: "hidden",
        textOverflow: "ellipsis",
      })}
    >
      {name}
    </TableCell>
  );
}

function CellDisplayBox({ isDisplay }: { isDisplay: boolean }) {
  return (
    <TableCell padding="checkbox">
      <Box sx={{ display: "grid", placeItems: "center" }}>
        {isDisplay && (
          <VisibilityRoundedIcon sx={{ fontSize: 22 }} color="primary" />
        )}
      </Box>
    </TableCell>
  );
}

interface TableRowProps {
  name: string;
  isSelected: boolean;
  isDisplay: boolean;
  onSelect: () => void;
  onClick: React.MouseEventHandler;
}

export default function TableRow({
  name,
  isSelected,
  isDisplay,
  onSelect,
  onClick,
}: TableRowProps) {
  return (
    <TableRowM
      hover
      variants={createMotionVar({ from: { y: 0, x: 65, scale: 1 } })}
      tabIndex={-1}
      selected={isDisplay}
      onClick={onClick}
      sx={{ cursor: "pointer" }}
    >
      <CellSelectBox checked={isSelected} onClick={onSelect} />
      <CellName name={name} isDisplay={isDisplay} />
      <CellDisplayBox isDisplay={isDisplay} />
    </TableRowM>
  );
}
