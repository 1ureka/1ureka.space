import type { Theme, ToggleButtonProps } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function Toggles({
  options,
  value,
  onChange,
  sx,
}: {
  options: string[];
  value: string;
  onChange: (mode: string) => void;
  sx: ToggleButtonProps["sx"];
}) {
  const handleChange = (_: React.MouseEvent, mode: string) => {
    if (mode) onChange(mode);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      sx={sx}
    >
      {options.map((val) => (
        <ToggleButton
          key={val}
          value={val}
          sx={{
            py: 1,
            flexGrow: 1,
            fontSize: (theme: Theme) => theme.typography.caption.fontSize,
          }}
        >
          {val}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
