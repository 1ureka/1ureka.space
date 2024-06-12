import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { absolute: "1ureka's space" },
};

import { Grid } from "@mui/material";
import { BoxM, GridM } from "@/components/Motion";
import { layoutChildMotionProps, yScaleVar } from "@/components/MotionProps";
import { NavCard } from "@/components/(home)";

// export default function Content() {
//   return (
//     <BoxM {...layoutChildMotionProps} sx={{ p: 4 }}>
//       <Stack direction="row" gap={7} flexWrap="wrap">
//         <Stack spacing={2}>
//           <BoxM variants={yVar}>
//             <Typography variant="subtitle2">BOOKS</Typography>
//           </BoxM>
//           <Stack direction="row" gap={3} flexWrap="wrap">
//             <NavCard
//               label="Scene"
//               caption="Anime and game scenes reimagined in realistic detail"
//               href="/books/scene"
//             />
//             <NavCard
//               label="Props"
//               caption="A collection of 3D models for outdoor scenes, from tiny screws to entire buildings."
//               href="/books/props"
//             />
//           </Stack>
//         </Stack>

//         <Stack spacing={2}>
//           <BoxM variants={yVar}>
//             <Typography variant="subtitle2">TOOLS</Typography>
//           </BoxM>
//           <Stack direction="row" gap={3} flexWrap="wrap">
//             <NavCard
//               label="File Manager"
//               caption="Seamlessly manage album's images with real-time backend syncing."
//               href="/tools/manager"
//             />
//             <NavCard
//               label="Image Editor"
//               caption="Transform photos with conversion, compression, and filters."
//               href="/tools/editor"
//             />
//           </Stack>
//         </Stack>
//       </Stack>
//     </BoxM>
//   );
// }

export default function Content({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const isGuest = searchParams?.guest === "";

  return (
    <BoxM {...layoutChildMotionProps} sx={{ p: 4 }}>
      <Grid container columns={4} rowSpacing={5} spacing={2} height={1}>
        <GridM item xs={4} lg={2} variants={yScaleVar}>
          <NavCard
            label="Scene"
            caption="Anime and game scenes reimagined in realistic detail"
            href="/books/scene"
            disabled={isGuest}
          />
        </GridM>
        <GridM item xs={4} lg={2} variants={yScaleVar}>
          <NavCard
            label="Scene"
            caption="Anime and game scenes reimagined in realistic detail"
            href="/books/scene"
            disabled={isGuest}
          />
        </GridM>
        <GridM item xs={4} lg={2} variants={yScaleVar}>
          <NavCard
            label="Scene"
            caption="Anime and game scenes reimagined in realistic detail"
            href="/books/scene"
            disabled={isGuest}
          />
        </GridM>
        <GridM item xs={4} lg={2} variants={yScaleVar}>
          <NavCard
            label="Scene"
            caption="Anime and game scenes reimagined in realistic detail"
            href="/books/scene"
          />
        </GridM>
      </Grid>
    </BoxM>
  );
}
