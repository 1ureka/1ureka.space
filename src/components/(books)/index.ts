export { default as Button } from "./input/Button";

export { default as Badge } from "./display/Badge";
export { default as Illustration } from "./display/Illustration ";

export { default as Gallery } from "./block/Gallery";

import dynamic from "next/dynamic";
export const Accordion = dynamic(() => import("./block/Accordion"), {
  ssr: false,
});
