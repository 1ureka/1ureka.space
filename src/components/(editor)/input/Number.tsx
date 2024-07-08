import type { OutlinedInputProps } from "@mui/material";
import { InputAdornment, OutlinedInput, Typography } from "@mui/material";

interface NumberInputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  endText: string;
  onChange: (value: number) => void;
}

const inputSx: OutlinedInputProps["sx"] = {
  "& .MuiInputBase-input": {
    fontSize: (theme) => theme.typography.body1.fontSize,
  },
};

export default function NumberInput({
  min,
  max,
  step,
  value,
  endText,
  onChange,
}: NumberInputProps) {
  const endAdornment = (
    <InputAdornment position="end">
      <Typography variant="body2">{endText}</Typography>
    </InputAdornment>
  );

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const value = target.value;
    const parsedValue = parseFloat(value);

    if (
      !value ||
      parsedValue < min ||
      parsedValue > max ||
      Number.isNaN(parsedValue)
    )
      return;

    onChange(parsedValue);
  };

  return (
    <OutlinedInput
      endAdornment={endAdornment}
      size="small"
      type="number"
      inputProps={{ min, max, step }}
      value={value}
      onChange={handleChange}
      sx={inputSx}
    />
  );
}
