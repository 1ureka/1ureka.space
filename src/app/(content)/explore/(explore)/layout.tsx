import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "books",
};

import { Box, Fab, Typography } from "@mui/material";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";

import { Carousels, Indicator } from "@/components/(explore)";
import { BoxM, StackM, TypographyM } from "@/components/Motion";
import { layoutChildMotionProps } from "@/components/MotionProps";
import { yScaleVar, opacityVar } from "@/components/MotionProps";

// can play sound effect here
export default function ExploreLayout(_: { children: React.ReactNode }) {
  return (
    <BoxM
      {...layoutChildMotionProps()}
      sx={{
        position: "relative",
        py: 3,
        px: { xs: 2, sm: 7 },
        display: "grid",
        placeItems: "center",
        gridTemplateRows: "0.45fr auto 0.45fr",
      }}
    >
      <BoxM
        variants={opacityVar}
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(http://1ureka.vercel.app/api/image/clyy2gbux0003v0i3vciotrw1/thumbnail)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          maskImage: "radial-gradient(#000 0%, #0000 80%)",
          filter: "blur(20px)",
        }}
      />

      <Box />

      <Carousels amount={10} sx={{ width: 1 }} />

      <StackM
        sx={{ alignSelf: "flex-start", gap: 1.5, alignItems: "center" }}
        variants={yScaleVar}
      >
        <Fab
          variant="extended"
          color="primary"
          sx={{
            mt: -6,
            "&:hover": { bgcolor: "primary.light", scale: "1.1" },
            transition: "all 0.25s",
            scale: "1.001",
            "&:active": { scale: "0.97" },
            width: "fit-content",
          }}
        >
          <NavigationRoundedIcon sx={{ mr: 1 }} />
          <Typography variant="h5" sx={{ lineHeight: 0.9 }}>
            EXPLORE
          </Typography>
        </Fab>
        <TypographyM variant="h6" variants={yScaleVar} zIndex={1}>
          {`Image 01 from "XXX"`}
        </TypographyM>
        <TypographyM variant="body2" variants={yScaleVar} zIndex={1}>
          {`Image 01 is from "XXX" , it reveal the beauty of the world`}
        </TypographyM>
      </StackM>

      <Box
        sx={{
          position: "absolute",
          inset: "auto 5% 5% auto",
          scale: "1.25",
          transformOrigin: "bottom right",
        }}
      >
        <Indicator amount={10} />
      </Box>

      {/* info , like includes how many (absolute left bottom) */}
    </BoxM>
  );
}
