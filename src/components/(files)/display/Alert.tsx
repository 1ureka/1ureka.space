import { Button } from "@mui/material";
import { AlertM } from "@/components/Motion";
import { yVar } from "@/components/MotionProps";

export default function Alert() {
  return (
    <AlertM
      variants={yVar}
      severity="error"
      sx={{ width: 1 }}
      action={
        <Button color="inherit" size="small">
          Sign In
        </Button>
      }
    >
      This page is for admin only. If your account is unauthorized, you will not
      be able to access even after completing the login process.
    </AlertM>
  );
}
