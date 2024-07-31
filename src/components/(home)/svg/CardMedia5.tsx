import { Box } from "@mui/material";

function Circle({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ax05-circle"
      style={{ overflow: "visible", ...style }}
    >
      <circle cx="40" cy="40" r="25" fill="white" />
      <circle
        cx="40"
        cy="40"
        r="37.5"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CardMedia() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        width: 1,
        height: 1,
        maskImage: "linear-gradient(#000, #0000)",
      }}
    >
      <Circle
        style={{ position: "absolute", top: "25%", left: "30%", scale: 0.5 }}
      />
      <Circle
        style={{ position: "absolute", top: "50%", left: "50%", scale: 0.5 }}
      />
      <Circle
        style={{ position: "absolute", top: "10%", left: "75%", scale: 0.5 }}
      />
    </Box>
  );
}
