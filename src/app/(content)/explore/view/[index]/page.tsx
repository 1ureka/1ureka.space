import { auth } from "@/auth";
import { isValidIndex } from "@/utils/utils";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Typography } from "@mui/material";

import { PortalContainer } from "@/components/(explore)";
import { TypographyM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

const fakeView = {
  points: [
    { x: Math.random() * 100, y: Math.random() * 100 },
    { x: Math.random() * 100, y: Math.random() * 100 },
  ],
};

function generateFakeData(index: number) {
  return {
    title: `Image ${index + 1} from "XXX"`,
    description: `Image ${
      index + 1
    } is from "XXX" , it reveal the beauty of the world`,
  };
}

export default async function ExploreContent({
  params: { index: indexString },
  searchParams,
}: {
  params: { index: unknown };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const index = isValidIndex(indexString, 10);
  if (index === -1) notFound();

  const { title, description } = generateFakeData(index);

  const session = await auth();
  const userId = JSON.stringify(session?.user.id);
  const expectedUserId = process.env.ALLOWED_USER;

  if (!userId || !expectedUserId || userId !== expectedUserId) {
    return <Title title={title} description={description} />;
  }

  return (
    <>
      <Title title={title} description={description} />

      <PortalContainer id="portal-root" show={"fullscreen" in searchParams}>
        <Typography variant="h1">
          {`View ${index} - ${fakeView.points.length} points`}
        </Typography>
        <Link href={`/explore/view/${index}`}>
          <Typography variant="h2">Exit</Typography>
        </Link>
      </PortalContainer>
    </>
  );
}

function Title({ title, description }: { title: string; description: string }) {
  return (
    <>
      <TypographyM variant="h6" variants={yScaleVar} zIndex={1}>
        {title}
      </TypographyM>

      <TypographyM variant="body2" variants={yScaleVar} zIndex={1}>
        {description}
      </TypographyM>
    </>
  );
}
