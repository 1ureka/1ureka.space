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
  value: string;
  onChange: (val: string) => void;
}) {
  const handleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = ({ target }) => {
    const { value } = target;
    if (options.includes(value)) onChange(value);
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
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          <Typography>{option}</Typography>
        </MenuItem>
      ))}
    </TextField>
  );
}
