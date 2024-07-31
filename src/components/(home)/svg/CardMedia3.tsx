import { Box } from "@mui/material";

export default function CardMedia() {
  const rect = [
    { x: 318, y: 291, width: 312.691, height: 47, className: "text" },
    { x: 718.989, y: 293, width: 140.525, height: 47, className: "text" },
    { x: 898.601, y: 293, width: 158.207, height: 47, className: "text" },
    { x: 233.5, y: 289.5, width: 48, height: 48, className: "icon" },
    { x: 318, y: 390.001, width: 347.125, height: 47, className: "text" },
    { x: 718.989, y: 392.001, width: 140.525, height: 47, className: "text" },
    { x: 934.898, y: 392.001, width: 121.912, height: 47, className: "text" },
    { x: 233.5, y: 388.5, width: 48, height: 48, className: "icon" },
    { x: 318, y: 489.001, width: 253.131, height: 47, className: "text" },
    { x: 718.989, y: 491.001, width: 120.982, height: 47, className: "text" },
    { x: 916.285, y: 491.001, width: 140.525, height: 47, className: "text" },
    { x: 233.5, y: 487.501, width: 48, height: 48, className: "icon" },
    { x: 318, y: 588.002, width: 282.912, height: 47, className: "text" },
    { x: 718.989, y: 590.002, width: 105.161, height: 47, className: "text" },
    { x: 898.601, y: 590.002, width: 158.207, height: 47, className: "text" },
    { x: 233.5, y: 586.501, width: 48, height: 48, className: "icon" },
    { x: 318, y: 687.003, width: 282.912, height: 47, className: "text" },
    { x: 718.989, y: 689.003, width: 140.525, height: 47, className: "text" },
    { x: 954.44, y: 689.003, width: 102.369, height: 47, className: "text" },
    { x: 233.5, y: 685.502, width: 48, height: 48, className: "icon" },
    { x: 318, y: 786.003, width: 282.912, height: 47, className: "text" },
    { x: 718.989, y: 788.004, width: 140.525, height: 47, className: "text" },
    { x: 954.44, y: 788.004, width: 102.369, height: 47, className: "text" },
    { x: 233.5, y: 784.503, width: 48, height: 48, className: "icon" },
    { x: 318, y: 885.004, width: 282.912, height: 47, className: "text" },
    { x: 718.989, y: 887.004, width: 140.525, height: 47, className: "text" },
    { x: 954.44, y: 887.004, width: 102.369, height: 47, className: "text" },
    { x: 233.5, y: 883.504, width: 48, height: 48, className: "icon" },
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
        width="1057"
        height="934"
        viewBox="0 0 1057 934"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          width: "90%",
          left: "20%",
          translate: "0px -5%",
        }}
      >
        {rect.map((rect, index) => (
          <rect
            key={index}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            rx="15"
            strokeWidth="5"
            strokeLinecap="round"
            className={rect.className}
          />
        ))}
      </svg>
    </Box>
  );
}
