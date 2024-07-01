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
        <ToggleButton value="scene" sx={{ py: 1 }}>
          Scene
        </ToggleButton>
      </Link>
      <Link href="/files?category=props">
        <ToggleButton value="props" sx={{ py: 1 }}>
          Props
        </ToggleButton>
      </Link>
    </ToggleButtonGroup>
  );
}
