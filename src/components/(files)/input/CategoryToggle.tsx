import Link from "next/link";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function CategoryToggle({
  value,
}: {
  value: "scene" | "props";
}) {
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
