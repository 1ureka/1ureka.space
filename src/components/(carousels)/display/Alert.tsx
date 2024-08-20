import "server-only";

import { Alert, AlertTitle } from "@mui/material";
import { BoxM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default function unAuth() {
  return (
    <BoxM variants={createMotionVar()} sx={{ position: "absolute" }}>
      <Alert severity="error" sx={{ maxWidth: 500 }}>
        <AlertTitle>No Session!</AlertTitle>
        This content is currently not public and for internal only. If your
        account is unauthorized, you will not be able to access even after
        completing the login process.
      </Alert>
    </BoxM>
  );
}
