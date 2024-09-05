import { validateSession } from "@/auth";
import { getSortedMetadata } from "@/data/metadata";

import { getProjectId } from "../utils";
import { sortArrayByPRNG } from "@/utils/utils";
import { delay } from "@/utils/server-utils";

import { ButtonBase } from "@mui/material";

export default async function Page({ params }: { params: { slug: string } }) {
  await delay(Math.random() * 2500);
  await validateSession();

  const id = await getProjectId(params.slug);
  const src = await getCoverSrc(id); // TODO: get the project's cover image

  return (
    <ButtonBase
      sx={{
        gridColumn: "2 / span 4",
        gridRow: "2 / span 6",
        boxShadow: 10,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(1.3)",
        transition: "all 0.3s ease",
        scale: "1.001",
        "&:hover": { scale: "1.05", borderRadius: 5 },
        "&:active": { scale: "1" },
      }}
    />
  );
}

async function getCoverSrc(projectId: string) {
  const idList = await getSortedMetadata("props");
  const thumbnailPathList = idList.map(
    ({ id }) => `/api/image/${id}/thumbnail`
  );

  return sortArrayByPRNG(thumbnailPathList, 200)[0].replace(
    "thumbnail",
    "origin"
  );
}
