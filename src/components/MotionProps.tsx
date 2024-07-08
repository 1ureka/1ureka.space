import { Variants } from "framer-motion";

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
export const layoutChildMotionProps = (props?: {
  stagger?: number;
}): MotionProps => ({
  variants: {
    animate: {
      transition: {
        delayChildren: 0.35,
        staggerChildren: props?.stagger ?? 0.1,
      },
    },
  },
  initial: "initial",
  animate: "animate",
});

//
//
// Bookspine
//
//
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
export const booksSpineExtandedVar: (stagger?: number) => Variants = (
  stagger = 0.1
) => ({
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
      staggerChildren: stagger,
      delayChildren: 0.2,
    },
  },
});

//
//
// Carousels
//
//
export const carouselsVar = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
    },
  },
};
export const carouselsImageVar = {
  initial: {
    opacity: 0,
    scale: 1.1,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
};
export const carouselsSlidesVar = {
  initial: {
    opacity: 0,
    x: "30%",
  },
  animate: {
    opacity: 1,
    x: "0%",
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { type: "spring", bounce: 0, duration: 1 },
  },
};
export const carouselsOriginVar = {
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", bounce: 0, duration: 1.5 },
  },
  hide: {
    opacity: 0,
    scale: 1.1,
    transition: { type: "spring", bounce: 0 },
  },
};

//
//
// common
//
//
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
