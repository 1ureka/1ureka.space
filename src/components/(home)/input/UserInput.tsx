import { TextField } from "@mui/material";

export default function UserInput() {
  return (
    <TextField
      margin="none"
      required
      fullWidth
      label="Username"
      name="username"
      autoComplete="username"
      autoFocus
    />
  );
}
