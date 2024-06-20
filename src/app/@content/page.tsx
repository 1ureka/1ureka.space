import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { absolute: "1ureka's space" },
};

import Image from "next/image";
import { Grid } from "@mui/material";
import { BoxM, GridM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { NavCard } from "@/components/(home)";

const placeholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN83rz2PwMRgHFUIX0VAgDrWR7n6UK5nAAAAABJRU5ErkJggg==";

const frame = (src: string) => (
  <Image
    fill
    src={src}
    placeholder={"blur"}
    blurDataURL={placeholder}
    style={{ objectFit: "cover" }}
    alt=""
  />
);

export default function Content({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const isGuest = searchParams?.guest === "";

  return (
    <BoxM {...layoutChildMotionProps} sx={{ p: 4 }} height={1}>
      <Grid
        container
        columns={4}
        rowSpacing={7}
        spacing={4}
        height={1}
        minHeight={500}
      >
        <GridM item xs={4} lg={2} variants={yScaleVar} height={0.5}>
          <NavCard
            media={frame("./frame1.svg")}
            sx={{ height: 1 }}
            title="Scene"
            subTitle=" books "
            caption="Anime and game scenes reimagined in realistic detail."
            href="/books/scene"
            disabled={isGuest}
          />
        </GridM>
        <GridM item xs={4} lg={2} variants={yScaleVar} height={0.5}>
          <NavCard
            media={frame("./frame2.svg")}
            sx={{ height: 1 }}
            title="Props"
            subTitle=" books "
            caption="A collection of 3D models for outdoor scenes, from tiny screws to entire buildings."
            href="/books/props"
            disabled={isGuest}
          />
        </GridM>
        <GridM item xs={4} lg={2} variants={yScaleVar} height={0.5}>
          <NavCard
            media={frame("./frame3.svg")}
            sx={{ height: 1 }}
            title="File Manager"
            subTitle=" tools "
            caption="Seamlessly manage album's images with real-time backend syncing."
            href="/tools/manager"
            disabled={isGuest}
          />
        </GridM>
        <GridM item xs={4} lg={2} variants={yScaleVar} height={0.5}>
          <NavCard
            media={frame("./frame4.svg")}
            sx={{ height: 1 }}
            title="Image Editor"
            subTitle=" tools "
            caption="Transform photos with conversion, compression, and filters."
            href="/tools/editor"
          />
        </GridM>
        <Grid item xs={4} height={0} />
      </Grid>
    </BoxM>
  );
}
