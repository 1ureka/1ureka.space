import { Variants } from "framer-motion";

// complex
export const bookSpineCollapsedVar: Variants = {
  open: {
    transition: { staggerChildren: 0.1 },
  },
  close: {
    transition: { staggerChildren: 0.1 },
  },
  initial: {
    x: "-100%",
  },
  animate: {
    x: 0,
    transition: { type: "spring", bounce: 0, duration: 0.7 },
  },
};
export const bookSpineCollapsedItemVar: Variants = {
  open: {
    opacity: 0,
    x: -60,
    height: 0,
    transition: { type: "spring", stiffness: 150, damping: 16 },
  },
  close: {
    opacity: 1,
    x: 0,
    height: "auto",
    transition: { type: "spring", stiffness: 150, damping: 16 },
  },
};
export const booksSpineExtandedVar: Variants = {
  initial: {
    scaleX: 0,
    transition: { type: "spring", bounce: 0, duration: 0.5 },
  },
  animate: {
    scaleX: 1,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

interface MotionProps {
  variants: Variants;
  [key: string]: unknown;
}
export const layoutMotionProps: MotionProps = {
  variants: {
    initial: {
      opacity: 0,
      y: 100,
      transition: { duration: 0 },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { type: "spring", bounce: 0, duration: 0.5 },
    },
  },
  initial: "initial",
  animate: "animate",
  exit: "exit",
};
export const layoutChildMotionProps: MotionProps = {
  variants: {
    animate: {
      transition: { delayChildren: 0.35, staggerChildren: 0.1 },
    },
  },
  initial: "initial",
  animate: "animate",
};

// common
export const yScaleVar: Variants = {
  initial: { opacity: 0, y: 65, scale: 0.9, transition: { duration: 0 } },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 16,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};
export const yVar: Variants = {
  initial: { opacity: 0, y: 65, transition: { duration: 0 } },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 16,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};
export const xVar: Variants = {
  initial: { opacity: 0, x: 65, transition: { duration: 0 } },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 16,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};
