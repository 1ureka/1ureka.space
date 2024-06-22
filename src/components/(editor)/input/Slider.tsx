import { Slider as MuiSlider } from "@mui/material";

export default function Slider({
  value,
  onChange,
}: {
  value: number;
  onChange: (event: Event, value: number) => void;
}) {
  const handleChange = (event: Event, value: number | number[]) => {
    if (typeof value === "number") onChange(event, value);
  };

  return (
    <MuiSlider
      value={value}
      marks
      min={0.5}
      max={1.5}
      step={0.1}
      valueLabelDisplay="auto"
      size="small"
      onChange={handleChange}
    />
  );
}
