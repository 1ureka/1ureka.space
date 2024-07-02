import { Button, Paper } from "@mui/material";
import { Alert as MuiAlert, AlertTitle } from "@mui/material";
import { BoxM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

export default function Alert() {
  return (
    <BoxM
      variants={yScaleVar}
      position="absolute"
      sx={{ inset: 0, display: "grid", placeItems: "center" }}
    >
      <Paper elevation={3}>
        <MuiAlert
          severity="error"
          sx={{ maxWidth: 500 }}
          action={
            <Button color="inherit" size="small">
              Sign In
            </Button>
          }
        >
          <AlertTitle>No Session!</AlertTitle>
          This content is currently not public and for internal only. If your
          account is unauthorized, you will not be able to access even after
          completing the login process.
        </MuiAlert>
      </Paper>
    </BoxM>
  );
}
