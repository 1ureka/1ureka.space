import { auth } from "@/auth";
import { notFound } from "next/navigation";

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

// includes all components in the portal
export default async function ExploreContent({
  params: { index: indexString },
}: {
  params: { index: unknown };
}) {
  if (typeof indexString !== "string") {
    notFound();
  }

  const index = parseInt(indexString, 10);

  if (Number.isNaN(index) || index < 0 || index >= 10) {
    notFound();
  }

  const session = await auth();
  const isAuth =
    !!session && JSON.stringify(session.user.id) === process.env.ALLOWED_USER;

  return null;
}
