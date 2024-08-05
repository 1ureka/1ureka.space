import { BoxM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import { ButtonBase, Tooltip } from "@mui/material";
import type { BoxProps } from "@mui/material";

export default function Point({
  color,
  name,
  sx,
}: {
  color: React.CSSProperties["color"];
  name: string;
  sx?: BoxProps["sx"];
}) {
  return (
    <BoxM
      variants={yScaleVar}
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
        ...sx,
      }}
    >
      <Tooltip title={name} placement="right" arrow>
        <ButtonBase sx={{ borderRadius: 999 }}>
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
