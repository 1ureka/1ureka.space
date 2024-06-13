import { AnimatePresence } from "framer-motion";
import { Box, Divider, Link, Stack, Typography } from "@mui/material";

import { BoxM, PaperM, StackM } from "@/components/Motion";
import { booksSpineExtandedVar, yScaleVar } from "@/components/MotionProps";
import { FlowerImage, NavButton } from ".";

const containerSx = {
  position: "absolute",
  height: 1,
  top: 0,
  left: "100%",
  p: 5,
  transformOrigin: "left",
  boxShadow: "none",
  borderRadius: "0",
  borderLeft: `solid 1px var(--mui-palette-divider)`,
};

export default function Expanded({ open }: { open: Boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <PaperM
          sx={containerSx}
          variants={booksSpineExtandedVar}
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

const configs = [
  { variant: "subheader", label: "HOME" },
  { variant: "button", label: "Index", href: "/" },
  { variant: "subheader", label: "BOOKS" },
  { variant: "button", label: "Scene", href: "/books/scene" },
  { variant: "button", label: "Props", href: "/books/props" },
  { variant: "subheader", label: "TOOLS" },
  { variant: "button", label: "Manager", href: "/tools/manager" },
  { variant: "button", label: "Editor", href: "/tools/editor" },
];

function Content() {
  return (
    <Stack alignItems="flex-start" justifyContent="space-between" height={1}>
      <FlowerImage sx={{ inset: "0 0 auto auto", p: 1 }} />

      <Stack spacing={1}>
        {configs.map(({ variant, label, href }, i) => (
          <BoxM key={label} variants={yScaleVar}>
            {variant === "subheader" ? (
              <Box sx={{ pt: i !== 0 ? 6 : null }}>
                <Typography variant="caption">{label}</Typography>
              </Box>
            ) : (
              <NavButton label={label} href={href ? href : "/"} />
            )}
          </BoxM>
        ))}
      </Stack>

      <StackM variants={yScaleVar} spacing={2.5} sx={{ whiteSpace: "nowrap" }}>
        <Divider flexItem />
        <Typography variant="caption">
          Design inspired by{" "}
          <Link
            href="https://alightinthewoods.net"
            target="_blank"
            rel="noopener"
            color="text.secondary"
          >
            https://alightinthewoods.net
          </Link>
        </Typography>
      </StackM>
    </Stack>
  );
}
