import Link from "next/link";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Suspense } from "react";

export function CategoryToggle({ value }: { value: "scene" | "props" }) {
  return (
    <ToggleButtonGroup color="primary" value={value} exclusive size="small">
      <Link href="/files?category=scene">
        <ToggleButton value="scene" sx={{ px: 1, py: 0.5 }}>
          Scene
        </ToggleButton>
      </Link>
      <Link href="/files?category=props">
        <ToggleButton value="props" sx={{ px: 1, py: 0.5 }}>
          Props
        </ToggleButton>
      </Link>
    </ToggleButtonGroup>
  );
}

export default function Wrapped({ value }: { value: "scene" | "props" }) {
  return (
    <Suspense>
      <CategoryToggle value={value} />
    </Suspense>
  );
}
