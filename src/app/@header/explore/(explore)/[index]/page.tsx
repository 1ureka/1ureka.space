import { NextLinkComposed } from "@/components/Link";
import { Button } from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

export default function Page({
  params: { index },
}: {
  params: { index: string };
}) {
  const id = `${index}'s id`;

  return (
    <Button
      component={NextLinkComposed}
      to={`/explore/edit/${id}`}
      startIcon={<BorderColorRoundedIcon />}
      variant="outlined"
      color="inherit"
    >
      Edit
    </Button>
  );
}
