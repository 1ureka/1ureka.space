import { validateKey } from "@/auth";
import { isValidIndex } from "@/utils/utils";
import { delay } from "@/utils/server-utils";

import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { Button, Skeleton } from "@mui/material";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";

import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default async function Page({
  params: { index: indexString },
}: {
  params: { index: unknown };
}) {
  const key = validateKey({ redirect: false });

  const index = isValidIndex(indexString, 10);
  if (index === -1) notFound();

  await delay(Math.random() * 2000);

  return (
    <BoxM
      variants={createMotionVar({ from: { scale: 1, y: 0 } })}
      sx={{ height: 1 }}
    >
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ height: 1, width: 1 }}
      />

      {key && (
        <Button
          component={Link}
          href={`/explore/fullscreen/${index}`}
          color="primary"
          startIcon={<FullscreenRoundedIcon />}
          variant="outlined"
          sx={{
            position: "absolute",
            inset: "auto 50% 0 auto",
            translate: "50% 0",
            m: 1,
            "&:hover": { scale: "1.05" },
            "&:active": { scale: "0.97" },
            transition: "all 0.2s ease",
            lineHeight: 1,
          }}
        >
          Fullscreen
        </Button>
      )}
    </BoxM>
  );
}
