"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

import type { ImageMetadataWithIndex } from "@/data/table";
import { delay } from "@/utils/client-utils";
import { BoxM } from "@/components/Motion";
import { carouselsImageVar, yScaleVar } from "@/components/MotionProps";

const containerSx = {
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
};

const alert = {
  noSession: {
    title: "No Session!",
    button: "Sign In",
    content: `This content is currently not public and for internal only. If your
            account is unauthorized, you will not be able to access even after
            completing the login process.`,
  },
};

export default function ImageAndName({
  width,
  height,
  metadataList,
  index,
}: {
  width: string;
  height: string;
  metadataList: ImageMetadataWithIndex[];
  index: number;
}) {
  const metadata = metadataList[index];

  // TODO: move to hooks/books
  const [state1K, setState1K] = useState<boolean>(false);
  const [src1K, setSrc1K] = useState<string | undefined>(undefined);
  useEffect(() => {
    let isCurr = true;

    (async () => {
      await delay(250);
      if (!isCurr) return;
      // TODO: fetch data and decode and setState
      console.log("fetch: " + metadata.name);
    })();

    return () => {
      isCurr = false;
    };
  }, [metadata]);

  const imageContainerSx = {
    position: "relative",
    display: "grid",
    placeItems: "center",
    overflow: "clip",
    width,
    height,
    maxWidth: `calc(${height} * (16 / 9))`,
    maxHeight: `calc(${width} * (9 / 16))`,
  };

  return (
    <Box sx={containerSx}>
      <BoxM variants={carouselsImageVar} sx={imageContainerSx}>
        {state1K && src1K ? (
          <Image
            src={src1K}
            alt={metadata.name}
            fill
            style={{
              display: "block",
              scale: "1.1",
              filter: "blur(5px) brightness(0.8)",
            }}
          />
        ) : (
          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ width: 1, height: 1 }}
          />
        )}

        <BoxM variants={yScaleVar} sx={{ position: "absolute" }}>
          <Alert
            severity="error"
            sx={{ maxWidth: 500 }}
            action={
              <Button color="inherit" size="small">
                {alert.noSession.button}
              </Button>
            }
          >
            <AlertTitle> {alert.noSession.title}</AlertTitle>
            {alert.noSession.content}
          </Alert>
        </BoxM>
      </BoxM>

      <Typography variant="h6" sx={{ position: "absolute", bottom: "3%" }}>
        {"GROUP: " +
          metadataList[index].group +
          ",  NAME: " +
          metadataList[index].name}
      </Typography>
    </Box>
  );
}
