"use client";

import Link from "next/link";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { usePathname } from "next/navigation";

function isValidPath(path: string): "images" | "projects" | null {
  if (!path.startsWith("/files/")) return null;

  const value = path.split("/")[2];
  if (value === "images" || value === "projects") return value;

  return null;
}

export default function CategoryToggle() {
  const pathname = usePathname();
  const value = isValidPath(pathname) ?? "images";

  return (
    <ToggleButtonGroup value={value} exclusive size="small">
      <Link href="/files/images">
        <ToggleButton value="images" sx={{ px: 1, py: 0.5 }}>
          Images
        </ToggleButton>
      </Link>
      <Link href="/files/projects">
        <ToggleButton value="projects" sx={{ px: 1, py: 0.5 }}>
          Projects
        </ToggleButton>
      </Link>
    </ToggleButtonGroup>
  );
}
