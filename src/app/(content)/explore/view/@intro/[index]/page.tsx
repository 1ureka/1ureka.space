import { isValidIndex } from "@/utils/utils";
import { notFound } from "next/navigation";

import { delay } from "@/utils/server-utils";
import { StackM, TypographyM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default async function Page({
  params: { index: indexString },
}: {
  params: { index: unknown };
}) {
  await delay(Math.random() * 2000);

  const index = isValidIndex(indexString, 10);
  if (index === -1) notFound();

  return (
    <StackM variants={createMotionVar()} gap={0.5}>
      <TypographyM variants={createMotionVar()} variant="h4">
        Explore Name {index + 1}
      </TypographyM>

      <TypographyM
        variants={createMotionVar()}
        variant="subtitle2"
        sx={{ fontStyle: "italic" }}
      >
        {`From "Artwork"`}
      </TypographyM>

      <TypographyM
        variants={createMotionVar()}
        variant="body1"
        sx={{ mt: 1.5 }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      </TypographyM>
    </StackM>
  );
}
