import type { MotionStyle, Variants } from "framer-motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ButtonBase, Typography, useTheme } from "@mui/material";

import Image from "next/image";
import flower from "@/images/flower2.png";

import { NextLinkComposed } from "@/components/Link";
import { BoxM } from "@/components/Motion";

const lineStyle: MotionStyle = {
  position: "absolute",
  inset: "auto 0 auto 0",
  height: "1px",
  background: "#fff",
};
const lineVariants: Variants = {
  selected: { originX: [0], scaleX: 1 },
  unselected: { originX: [1], scaleX: 0 },
};
const iconVariants: Variants = {
  initial: { width: 0, height: 0, opacity: 0 },
  animate: { width: "auto", height: "auto", opacity: 0.2 },
};

export default function NavButton({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const selected = pathname === href.split("?")[0];

  const root = document.documentElement;
  const style = window.getComputedStyle(root);
  const defaultFontSizeString = style.getPropertyValue("font-size");
  const defaultFontSize = parseFloat(defaultFontSizeString);

  const { fontSize } = useTheme().typography;
  const indicatorSize = 1.6 * 1.25 * (fontSize / 14) * defaultFontSize;

  return (
    <BoxM
      variants={{ hover: { x: 10 } }}
      animate={selected ? "selected" : "unselected"}
      whileHover={["selected", "hover"]}
    >
      <ButtonBase component={NextLinkComposed} sx={{ p: 2 }} to={href}>
        <BoxM
          sx={{ translate: "-10px 0" }}
          variants={iconVariants}
          animate={selected ? "animate" : "initial"}
        >
          {selected && (
            <Image
              src={flower}
              alt="flower decoration"
              width={indicatorSize}
              height={indicatorSize}
              decoding="async"
              style={{ display: "block" }}
            />
          )}
        </BoxM>

        <Typography variant="h5" sx={{ position: "relative" }}>
          {label}
          <motion.div
            variants={lineVariants}
            style={lineStyle}
            aria-hidden="true"
          />
        </Typography>
      </ButtonBase>
    </BoxM>
  );
}
