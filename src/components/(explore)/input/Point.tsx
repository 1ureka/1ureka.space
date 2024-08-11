import { BoxM } from "@/components/Motion";
import { opacityVar, yScaleVar } from "@/components/MotionProps";
import { ButtonBase, Tooltip, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";

type DragConstraints = React.ComponentProps<typeof BoxM>["dragConstraints"];

type PointProps = {
  color: React.CSSProperties["color"];
  name: string;
  sx?: BoxProps["sx"];
} & (
  | {
      isDragable: true;
      dragConstraints: DragConstraints;
    }
  | {
      isDragable?: false;
      dragConstraints?: never;
    }
);

export default function Point({
  isDragable,
  dragConstraints = false,
  color,
  name,
  sx,
}: PointProps) {
  return (
    <BoxM
      drag={isDragable}
      dragMomentum={false}
      dragConstraints={dragConstraints}
      variants={isDragable ? opacityVar : yScaleVar}
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
