import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { absolute: "1ureka's space" },
};

import Image from "next/image";
import { GridM } from "@/components/Motion";
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

const cardData = [
  {
    media: frame("./frame1.svg"),
    title: "Scene",
    subTitle: "books",
    caption: "Anime and game scenes reimagined in realistic detail.",
    href: "/scene",
  },
  {
    media: frame("./frame2.svg"),
    title: "Props",
    subTitle: "books",
    caption:
      "A collection of 3D models for outdoor scenes, from tiny screws to entire buildings.",
    href: "/props",
  },
  {
    media: frame("./frame3.svg"),
    title: "File Shelf",
    subTitle: "tools",
    caption: "Seamlessly manage album's images with real-time backend syncing.",
    href: "/files",
  },
  {
    media: frame("./frame4.svg"),
    title: "Image Editor",
    subTitle: "tools",
    caption: "Transform photos with conversion, compression, and filters.",
    href: "/editor",
  },
];

export default function Content() {
  return (
    <GridM
      {...layoutChildMotionProps}
      container
      columns={{ xs: 1, lg: 2 }}
      spacing={7}
      sx={{ pt: 5, pb: 7, px: 9 }}
    >
      {cardData.map((card, index) => (
        <GridM
          key={index}
          item
          xs={1}
          variants={yScaleVar}
          height={{ xs: "max(35vh, 250px)", lg: 0.5 }}
        >
          <NavCard {...card} />
        </GridM>
      ))}
    </GridM>
  );
}
