import { validateSession } from "@/auth";
import { getCoverData, getProject } from "../utils";
import { ButtonBase, Skeleton } from "@mui/material";
import Image from "next/image";

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
    <ButtonBase
      sx={{
        gridColumn: "2 / span 4",
        gridRow: "2 / span 6",
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
      <Image
        unoptimized
        src={src}
        alt={coverData.name}
        fill
        style={{ objectFit: "cover", filter: "brightness(1.3)" }}
      />
    </ButtonBase>
  );
}
