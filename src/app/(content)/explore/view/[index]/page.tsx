import { Box } from "@mui/material";

const fakeViewport = {
  id: "cjs0v5z5z0000j1qg1z1z1z1z",
  exploreId: "cjs0v5z5z0000j1qg1z1z1z1z",
  points: [
    {
      x: 0.0,
      y: 0.0,
      sourceId: "cjs0v5z5z0000j1qg1z1z1z1z",
      targetId: "cjs0v5z5z0000j1qg1z1z1z1z",
    },
    {
      x: 0.0,
      y: 0.0,
      sourceId: "cjs0v5z5z0000j1qg1z1z1z1z",
      targetId: "cjs0v5z5z0000j1qg1z1z1z1z",
    },
  ],
};

function randomizeViewport() {
  const updatedViewport = {
    ...fakeViewport,
    points: fakeViewport.points.map((point) => ({
      ...point,
      x: Math.random() * 100,
      y: Math.random() * 100,
    })),
  };
  return updatedViewport;
}

const updatedViewports = Array.from({ length: 10 }, (_) => {
  return randomizeViewport();
});

// includes all components in the portal
export default function ExploreContent({
  params: { index },
}: {
  params: { index: number };
}) {
  return (
    <Box sx={{ position: "relative", minHeight: "calc(100vw * 0.375)" }}>
      {updatedViewports[index].points.map((point, index) => (
        <Point key={index} x={point.x} y={point.y} />
      ))}
    </Box>
  );
}

function Point({ x, y }: { x: number; y: number }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: `${y}%`,
        left: `${x}%`,
        transform: "translate(-50%, -50%)",
        width: 10,
        height: 10,
        borderRadius: "50%",
        bgcolor: "grey",
      }}
    />
  );
}
