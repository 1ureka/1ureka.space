import { NextLinkComposed } from "@/components/Link";
import { isValidIndex } from "@/utils/utils";

import { Button } from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

export default function Page({ params }: { params: { index: string } }) {
  const index = isValidIndex(params.index, 10);
  if (index === -1) return null;

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
