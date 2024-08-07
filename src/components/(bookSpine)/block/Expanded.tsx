import { AnimatePresence } from "framer-motion";
import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import type { PaperProps, Theme } from "@mui/material";

import { BoxM, PaperM, StackM } from "@/components/Motion";
import { createExtandedVar, yScaleVar } from "@/components/MotionProps";
import { FlowerImage, NavButton } from "..";

export default function Expanded({ open }: { open: boolean }) {
  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

  const containerSx: PaperProps["sx"] = {
    position: "absolute",
    inset: isMobile ? "auto auto 100% auto" : "0 auto auto 100%",

    width: isMobile ? 1 : "auto",
    height: isMobile ? "auto" : 1,
    p: 5,
    transformOrigin: isMobile ? "bottom" : "left",

    boxShadow: "none",
    borderRadius: "0",
    borderLeft: isMobile ? "" : `solid 1px var(--mui-palette-divider)`,
    borderBottom: isMobile ? `solid 1px var(--mui-palette-divider)` : "",
  };

  return (
    <AnimatePresence>
      {open && (
        <PaperM
          sx={containerSx}
          variants={createExtandedVar(0.06, isMobile ? "y" : "x")}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          <Content isMobile={isMobile} />
        </PaperM>
      )}
    </AnimatePresence>
  );
}

function Content({ isMobile }: { isMobile: boolean }) {
  const configs = [
    { variant: "subheader", label: "HOME" },
    { variant: "button", label: "Index", href: "/" },
    { variant: "subheader", label: "BOOKS" },
    { variant: "button", label: "Scene", href: "/scene" },
    { variant: "button", label: "Props", href: "/props" },
    { variant: "subheader", label: "TOOLS" },
    { variant: "button", label: "Shelf", href: "/files/images" },
    { variant: "button", label: "Editor", href: "/editor" },
  ];

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

      {!isMobile && (
        <StackM
          variants={yScaleVar}
          spacing={2.5}
          sx={{ whiteSpace: "nowrap" }}
        >
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
      )}
    </Stack>
  );
}
