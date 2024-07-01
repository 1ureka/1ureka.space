import { type BoxProps, Button } from "@mui/material";
import { Alert as MuiAlert, AlertTitle } from "@mui/material";

import { BoxM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";

const alert = {
  noSession: {
    title: "No Session!",
    button: "Sign In",
    content: `This content is currently not public and for internal only. If your
              account is unauthorized, you will not be able to access even after
              completing the login process.`,
  },
};

export default function Alert({
  sx,
  animated = true,
}: {
  sx?: BoxProps["sx"];
  animated?: boolean;
}) {
  return (
    <BoxM
      variants={animated ? yScaleVar : {}}
      sx={{ position: "absolute", ...sx }}
    >
      <MuiAlert
        severity="error"
        sx={{ maxWidth: 500 }}
        action={
          <Button color="inherit" size="small">
            {alert.noSession.button}
          </Button>
        }
      >
        <AlertTitle> {alert.noSession.title}</AlertTitle>
        {alert.noSession.content}
      </MuiAlert>
    </BoxM>
  );
}
