import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div style={{ alignSelf: "center", justifySelf: "center" }}>
      <CircularProgress />
    </div>
  );
}
