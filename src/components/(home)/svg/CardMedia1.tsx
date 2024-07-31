import { Box } from "@mui/material";

export default function CardMedia() {
  const rects = [
    { x: 456.011, y: 0, width: 320, height: 180 },
    { x: 813.404, y: 95.7631, width: 320, height: 180 },
    { x: 1170.8, y: 191.526, width: 320, height: 180 },
    { x: 396.483, y: 222.163, width: 320, height: 217.704 },
    { x: 753.875, y: 317.926, width: 320, height: 180 },
    { x: 1111.27, y: 413.689, width: 320, height: 180 },
    { x: 327.196, y: 480.745, width: 320, height: 216.91 },
    { x: 684.589, y: 576.508, width: 320, height: 245.472 },
    { x: 1041.98, y: 672.271, width: 320, height: 180 },
    { x: 250.722, y: 766.149, width: 320, height: 261.061 },
    { x: 608.115, y: 861.912, width: 320, height: 212.126 },
    { x: 965.507, y: 957.675, width: 320, height: 249.669 },
    { x: 170.214, y: 1066.61, width: 320, height: 215.151 },
    { x: 527.606, y: 1162.37, width: 320, height: 180 },
    { x: 884.999, y: 1258.14, width: 320, height: 180 },
    { x: 101.587, y: 1322.73, width: 320, height: 180 },
    { x: 458.98, y: 1418.49, width: 320, height: 180 },
    { x: 816.373, y: 1514.25, width: 320, height: 180 },
  ];

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
      <svg
        width="1480"
        height="1771"
        viewBox="0 0 1480 1771"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", width: "90%", left: "20%" }}
      >
        {rects.map((rect, index) => (
          <rect
            key={index}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            rx="15"
            transform={`rotate(15 ${rect.x} ${rect.y})`}
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </Box>
  );
}
