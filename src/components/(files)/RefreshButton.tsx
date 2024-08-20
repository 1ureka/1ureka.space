"use client";

import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import { yScaleVar } from "@/components/MotionProps";
import { motion, useSpring } from "framer-motion";

export default function RefreshButton() {
  const rotate = useSpring(0, { stiffness: 150, damping: 20 });
  const router = useRouter();

  const handleClick = () => {
    router.refresh();
    rotate.jump(0);
    rotate.set(360);
  };

  return (
    <motion.div variants={yScaleVar} style={{ rotate }}>
      <IconButton onClick={handleClick}>
        <RefreshRoundedIcon />
      </IconButton>
    </motion.div>
  );
}
