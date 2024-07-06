import type { ImageMetadataWithIndex } from "@/data/type";
import { Alert, Origin, Thumbnail } from "..";
import { BoxM } from "@/components/Motion";
import { carouselsImageVar } from "@/components/MotionProps";

const createImageContainerSx = (width: string, height: string) => ({
  position: "relative",
  display: "grid",
  placeItems: "center",
  overflow: "clip",
  width,
  height,
  maxWidth: `calc(${height} * (16 / 9))`,
  maxHeight: `calc(${width} * (9 / 16))`,
});

export default function CarouselsImage({
  metadataList,
}: {
  metadataList: ImageMetadataWithIndex[];
}) {
  const isAuth = false;

  return (
    <BoxM
      variants={carouselsImageVar}
      sx={createImageContainerSx("75vw", "77.5vh")}
    >
      <Thumbnail metadataList={metadataList} />
      {isAuth ? <Origin metadataList={metadataList} /> : <Alert />}
    </BoxM>
  );
}
