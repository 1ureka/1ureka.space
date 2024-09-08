import { validateSession } from "@/auth";
import { getCoverData, getProject } from "../utils";

import { ButtonBase, Skeleton } from "@mui/material";
import { createMotionVar } from "@/components/MotionProps";
import { BoxM } from "@/components/Motion";
import CoverImage from "@/components/(explore)/CoverImage";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await validateSession();
  const data = await getProject(params.slug);
  const coverData = getCoverData(data, searchParams);
  const src = `/api/image/${coverData.metadataId}/origin`;

  return (
    <BoxM
      variants={createMotionVar({ from: { y: 0 } })}
      sx={{
        position: "relative",
        gridColumn: "2 / span 4",
        gridRow: "2 / span 6",
      }}
    >
      <ButtonBase
        sx={{
          position: "absolute",
          inset: 0,
          boxShadow: 10,
          overflow: "hidden",
          transition: "all 0.3s ease",
          scale: "1.001",
          "&:hover": { scale: "1.05", borderRadius: 5 },
          "&:active": { scale: "1" },
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: "absolute", width: 1, height: 1 }}
        />
        <CoverImage src={src} name={coverData.name} />
      </ButtonBase>
    </BoxM>
  );
}
