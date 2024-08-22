import { validateUserSession } from "@/auth";
import { isValidIndex } from "@/utils/utils";
import { delay } from "@/utils/server-utils";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Backdrop, Button, IconButton, Portal, Skeleton } from "@mui/material";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";

import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default async function Page({
  params: { index: indexString },
  searchParams,
}: {
  params: { index: unknown };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await validateUserSession({ isRedirect: false });

  const index = isValidIndex(indexString, 10);
  if (index === -1) notFound();

  const isFullscreen = typeof searchParams.fullscreen === "string";

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

      {session && (
        <Button
          component={Link}
          href={`/explore/view/${index}?fullscreen`}
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

      {session && (
        <Portal>
          <Backdrop open={isFullscreen}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ height: 1, width: 1 }}
            />

            <IconButton
              component={Link}
              href={`/explore/view/${index}`}
              sx={{
                position: "absolute",
                inset: "auto 0 0 auto",
                m: 1,
                "&:hover": { scale: "1.05" },
                "&:active": { scale: "0.97" },
                transition: "all 0.2s ease",
              }}
            >
              <FullscreenExitRoundedIcon />
            </IconButton>
          </Backdrop>
        </Portal>
      )}
    </BoxM>
  );
}
