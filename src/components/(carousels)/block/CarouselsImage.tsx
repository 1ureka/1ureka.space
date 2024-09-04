import "server-only";

import type { ImageMetadataWithIndex } from "@/data/type";
import { validateSession } from "@/auth";

import { BoxM } from "@/components/Motion";
import { carouselsImageVar } from "@/components/MotionProps";

import Thumbnail from "../media/Thumbnail";
import Origin from "../media/Origin";
import Alert from "../display/Alert";

const createImageContainerSx = (width: string, height: string) => ({
  position: "relative",
  display: "grid",
  placeItems: "center",
  overflow: "clip",
  width,
  height,
  maxWidth: `calc(${height} * (16 / 9))`,
  maxHeight: `calc(${width} * (9 / 16))`,
  boxShadow: 20,
  borderRadius: 1,
});

export default async function CarouselsImage({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  const session = await validateSession({ redirect: false });

  return (
    <BoxM
      variants={carouselsImageVar}
      sx={createImageContainerSx("75vw", "77.5vh")}
    >
      <Thumbnail metadataList={metadataList} />
      {session ? <Origin metadataList={metadataList} /> : <Alert />}
    </BoxM>
  );
}
