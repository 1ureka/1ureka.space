"use client";

import Link from "next/link";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { usePathname } from "next/navigation";

function isValidPath(path: string): "images" | "sounds" | "3D" | null {
  if (!path.startsWith("/files/")) return null;

  const value = path.split("/")[2];
  if (!["images", "sounds", "3D"].includes(value)) return null;

  return value as "images" | "sounds" | "3D";
}

export default function CategoryToggle() {
  const pathname = usePathname();
  const value = isValidPath(pathname) ?? "images";

  return (
    <ToggleButtonGroup color="primary" value={value} exclusive size="small">
      <Link href="/files/images">
        <ToggleButton value="images" sx={{ px: 1, py: 0.5 }}>
          Images
        </ToggleButton>
      </Link>
      <Link href="/files/sounds">
        <ToggleButton value="sounds" sx={{ px: 1, py: 0.5 }}>
          Sounds
        </ToggleButton>
      </Link>
      <Link href="/files/3D">
        <ToggleButton value="3D" sx={{ px: 1, py: 0.5 }}>
          3D
        </ToggleButton>
      </Link>
    </ToggleButtonGroup>
  );
}
