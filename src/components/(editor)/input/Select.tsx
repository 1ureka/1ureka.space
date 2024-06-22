import type { TextFieldProps } from "@mui/material";
import { MenuItem, TextField, Typography } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

export default function SelectInput({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: number;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}) {
  const inputSx: TextFieldProps["sx"] = {
    "& .MuiInputBase-input": {
      fontSize: (theme) => theme.typography.body1.fontSize,
    },
  };

  return (
    <TextField
      size="small"
      select
      value={value}
      onChange={onChange}
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
