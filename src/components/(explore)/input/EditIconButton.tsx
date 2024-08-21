"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { delay } from "@/utils/client-utils";
import { isValidIndex } from "@/utils/utils";

async function getEditUrl(pathname: string) {
  const indexString = pathname.match(/\/explore\/view\/(.*)/)?.[1] ?? "";
  const index = isValidIndex(indexString, 10);

  if (index === -1) return "/explore/new";

  await delay(Math.random() * 2000);
  // TODO: const id = await getExploreIdByIndex(index);
  const id = `explore-${index}`;

  return `/explore/edit/${id}`;
}

export default function EditIconButton() {
  const [editUrl, setEditUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let current = true;

    setLoading(true);
    getEditUrl(pathname).then((url) => {
      if (!current) return;
      setEditUrl(url);
      setLoading(false);
    });

    return () => {
      current = false;
    };
  }, [pathname]);

  if (loading) {
    return <CircularProgress size={30} sx={{ p: 1 }} color="inherit" />;
  }

  return (
    <IconButton size="small" component={Link} href={editUrl} color="inherit">
      <EditRoundedIcon fontSize="small" />
    </IconButton>
  );
}
