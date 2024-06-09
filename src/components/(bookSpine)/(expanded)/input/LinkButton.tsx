import { StackM, yVar } from "@/components/Motion";
import type { IconButtonProps } from "@mui/material";
import { Link, Stack, Typography } from "@mui/material";

const linkSx: IconButtonProps["sx"] = {
  color: "text.secondary",
  "&:hover": { color: "text.primary" },
};

export default function LinkButton({
  label,
  caption,
  icon,
  url,
}: {
  label: string;
  caption: string;
  icon: React.ReactNode;
  url: string;
}) {
  return (
    <StackM spacing={1} variants={yVar}>
      <Typography variant="caption">{label}</Typography>
      <Stack direction="row" spacing={2}>
        {icon}
        <Link
          variant="h6"
          sx={linkSx}
          underline="hover"
          href={url}
          target="_blank"
          rel="noopener"
        >
          {caption}
        </Link>
      </Stack>
    </StackM>
  );
}
