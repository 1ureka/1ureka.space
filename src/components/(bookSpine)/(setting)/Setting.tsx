import { AnimatePresence } from "framer-motion";

import { PaperM } from "../../Motion";

export default function Setting({ open }: { open: Boolean }) {
  const containerSx = {
    position: "absolute",
    bottom: -10,
    left: "100%",
    p: 5,
    transformOrigin: "left",
    borderRadius: "0 20px 0 0",
    border: `solid 1px var(--mui-palette.divider)`,
    borderWidth: "1px 1px 0px 1px",
  };

  return (
    <AnimatePresence>
      {open && (
        <PaperM
          sx={containerSx}
          variants={{}}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          <Content />
        </PaperM>
      )}
    </AnimatePresence>
  );
}

function Content() {
  return <div></div>;
}
