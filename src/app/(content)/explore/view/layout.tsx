import { validateSession } from "@/auth";
import { Box, Portal } from "@mui/material";
import Feed from "@/components/(explore)/Feed";
import Intro from "@/components/(explore)/Intro";

function MaxWidthContainer({ children }: { children: React.ReactNode }) {
  const width = "clamp(1200px, 100%, 1700px)";
  return <Box sx={{ width, mx: "auto", position: "relative" }}>{children}</Box>;
}

function Gradients() {
  const baseSx = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 20,
    bgcolor: "content.layer2",
  };

  const horizontalGradient =
    "linear-gradient(to left, #fff, transparent 20%, transparent 80%, #fff)";
  const verticalGradient =
    "linear-gradient(transparent, transparent 80%, #fff)";

  return (
    <>
      <Box sx={{ ...baseSx, maskImage: horizontalGradient }} />
      <Box sx={{ ...baseSx, maskImage: verticalGradient }} />
    </>
  );
}

function GridContainer({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: React.ComponentProps<typeof Box>["sx"];
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(8, 1fr)`,
        gridAutoRows: "80px",
        width: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default async function Layout({
  children,
  intro,
  images,
  tags,
}: {
  children: React.ReactNode;
  intro: React.ReactNode;
  images: React.ReactNode;
  tags: React.ReactNode;
}) {
  await validateSession();

  const totalProjects = 10; // TODO: fetch from server

  return (
    <Portal>
      <Box sx={{ overflow: "auto", position: "absolute", inset: 0 }}>
        <MaxWidthContainer>
          <GridContainer
            sx={{ position: "absolute", inset: 0, overflow: "clip", height: 1 }}
          >
            {images}
            <Gradients />
          </GridContainer>

          <GridContainer sx={{ position: "relative", zIndex: 20 }}>
            {children}

            <Intro
              intro={intro}
              tags={tags}
              sx={{
                gridRow: "2 / span 6",
                gridColumn: "-4 / span 3",
                mx: 10,
                my: -3.5,
              }}
            />

            <Feed
              total={totalProjects}
              sx={{
                gridRow: "10 / span 3",
                gridColumn: "2 / span 7",
                mt: -5,
                mr: 10,
                mb: 5,
              }}
            />
          </GridContainer>
        </MaxWidthContainer>
      </Box>
    </Portal>
  );
}
