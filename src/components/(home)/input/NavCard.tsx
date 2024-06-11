import { CardM } from "@/components/Motion";
import { yScaleVar } from "@/components/MotionProps";
import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

export default function NavCard({
  label,
  caption,
}: {
  label: string;
  caption: string;
}) {
  return (
    <CardM variants={yScaleVar} sx={{ width: 345 }} elevation={3}>
      <CardActionArea>
        <CardMedia>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="200">
            <rect width="100%" height="100%" fill="#e783ad" />
          </svg>
        </CardMedia>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h5">
              {label}
            </Typography>
            <ArrowOutwardRoundedIcon color="primary" />
          </Stack>
          <Typography variant="caption">{caption}</Typography>
        </CardContent>
      </CardActionArea>
    </CardM>
  );
}
