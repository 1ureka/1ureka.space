import { Button } from "@mui/material";
import { Alert as MuiAlert, AlertTitle } from "@mui/material";
import { BoxM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

export default function Alert() {
  return (
    <BoxM variants={yScaleVar} sx={{ position: "absolute" }}>
      <MuiAlert severity="error" sx={{ maxWidth: 500 }}>
        <AlertTitle>No Session!</AlertTitle>
        This content is currently not public and for internal only. If your
        account is unauthorized, you will not be able to access even after
        completing the login process.
      </MuiAlert>
    </BoxM>
  );
}
