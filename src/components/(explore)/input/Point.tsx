import { BoxM as _BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";
import { ButtonBase, Tooltip, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import type { motion } from "framer-motion";

type DragConstraints = React.ComponentProps<
  typeof motion.div
>["dragConstraints"];
type DragEvent = React.ComponentProps<typeof motion.div>["onDragEnd"];

const BoxM = _BoxM as React.FC<
  Omit<React.ComponentProps<typeof _BoxM>, "onDragEnd"> & {
    onDragEnd: DragEvent;
  }
>;

type PointProps = {
  color: React.CSSProperties["color"];
  name: string;
  sx?: BoxProps["sx"];
} & (
  | {
      isDragable: true;
      dragConstraints: DragConstraints;
      onDragEnd: DragEvent;
    }
  | {
      isDragable?: false;
      dragConstraints?: never;
      onDragEnd?: never;
    }
);

export default function Point({
  isDragable,
  dragConstraints = false,
  onDragEnd = () => {},
  color,
  name,
  sx,
}: PointProps) {
  return (
    <BoxM
      drag={isDragable}
      dragMomentum={false}
      dragConstraints={dragConstraints}
      onDragEnd={onDragEnd}
      variants={createMotionVar(isDragable ? { from: { y: 0 } } : undefined)}
      sx={{
        display: "grid",
        placeItems: "center",
        "& .ax05-circle :first-child": {
          fillOpacity: 0.6,
          transition: `all 1s cubic-bezier(0.22, 0.61, 0.36, 1)`,
        },
        "& .ax05-circle :last-child": {
          strokeOpacity: 0.6,
          strokeDasharray: "30",
          strokeDashoffset: "120",
          scale: "1",
          transformOrigin: "center",
          transition: `all 1s cubic-bezier(0.22, 0.61, 0.36, 1)`,
        },
        "&:hover .ax05-circle :first-child": {
          fillOpacity: 1,
        },
        "&:hover .ax05-circle :last-child": {
          strokeDashoffset: "0",
          scale: "1.2",
        },
        overflow: "visible",
        width: 0,
        height: 0,
        ...sx,
      }}
    >
      <Tooltip
        title={<Typography sx={{ whiteSpace: "nowrap" }}>{name}</Typography>}
        placement="right"
        arrow
        PopperProps={{ disablePortal: true }}
      >
        <ButtonBase sx={{ position: "absolute", borderRadius: 999 }}>
          <Circle color={color} />
        </ButtonBase>
      </Tooltip>
    </BoxM>
  );
}

function Circle({ color }: { color?: React.CSSProperties["color"] }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ax05-circle"
      style={{ overflow: "visible" }}
    >
      <circle cx="40" cy="40" r="25" fill={color} />
      <circle
        cx="40"
        cy="40"
        r="37.5"
        stroke={color}
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
