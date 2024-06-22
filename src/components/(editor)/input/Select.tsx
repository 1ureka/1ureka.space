import type { TextFieldProps } from "@mui/material";
import { MenuItem, TextField, Typography } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

const inputSx: TextFieldProps["sx"] = {
  "& .MuiInputBase-input": {
    fontSize: (theme) => theme.typography.body1.fontSize,
  },
};

export default function SelectInput({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: number;
  onChange: (val: number) => void;
}) {
  const handleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = ({ target }) => {
    const { value } = target;
    const parsedValue = parseInt(value, 10);
    if (
      Number.isInteger(parsedValue) &&
      parsedValue >= 0 &&
      parsedValue < options.length
    )
      onChange(parsedValue);
  };

  return (
    <TextField
      size="small"
      select
      value={value}
      onChange={handleChange}
      InputProps={{ sx: inputSx }}
      SelectProps={{ IconComponent: ArrowDropDownRoundedIcon }}
    >
      {options.map((option, i) => (
        <MenuItem key={option} value={i}>
          <Typography>{option}</Typography>
        </MenuItem>
      ))}
    </TextField>
  );
}
