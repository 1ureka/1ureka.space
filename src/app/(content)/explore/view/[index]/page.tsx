import { auth } from "@/auth";
import { PortalContainer } from "@/components/(explore)";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";

const fakeView = {
  points: [
    { x: Math.random() * 100, y: Math.random() * 100 },
    { x: Math.random() * 100, y: Math.random() * 100 },
  ],
};

// includes all components in the portal
export default async function ExploreContent({
  params: { index: indexString },
  searchParams,
}: {
  params: { index: unknown };
  searchParams: { [key: string]: string | string[] | undefined };
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

  if (!isAuth) {
    return null;
  }

  const isFullscreen = "fullscreen" in searchParams;

  return (
    <PortalContainer id="portal-root" show={isFullscreen}>
      <Typography variant="h1">
        {`View ${index} - ${fakeView.points.length} points`}
      </Typography>
      <Link href={`/explore/view/${index}`}>
        <Typography variant="h2">Exit</Typography>
      </Link>
    </PortalContainer>
  );
}
