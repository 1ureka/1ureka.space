import type { MotionStyle } from "framer-motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ButtonBase, Typography } from "@mui/material";

import { NextLinkComposed } from "@/components/Link";
import { BoxM } from "@/components/Motion";

const lineStyle: MotionStyle = {
  position: "absolute",
  inset: "auto 0 auto 0",
  height: "1px",
  background: "#fff",
};

const lineVariants = {
  selected: { originX: [0], scaleX: 1 },
  unselected: { originX: [1], scaleX: 0 },
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

  return (
    <BoxM
      variants={{ hover: { x: 10 } }}
      animate={selected ? "selected" : "unselected"}
      whileHover={["selected", "hover"]}
    >
      <ButtonBase component={NextLinkComposed} sx={{ p: 2 }} to={href}>
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
