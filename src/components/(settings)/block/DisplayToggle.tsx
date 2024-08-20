"use client";

import { Button, ButtonMediaWrapper } from "../input/Button";
import { Typography } from "@mui/material";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";

import { useRecoilState } from "recoil";
import { BOOKS_IS_EXPANDED } from "@/context/store";

const buttonMediaSx = {
  width: 0.6,
  aspectRatio: 1,
  height: "auto",
};

export default function DisplayToggle() {
  const [isExpanded, setIsExpanded] = useRecoilState(BOOKS_IS_EXPANDED);

  return (
    <>
      <Button
        sx={{ py: 8 }}
        color="secondary"
        active={!isExpanded}
        onClick={() => setIsExpanded(false)}
      >
        <ButtonMediaWrapper>
          <CollectionsRoundedIcon
            sx={{
              ...buttonMediaSx,
              transform: "rotate(10deg) translateY(-15%) translateX(20%)",
            }}
          />
        </ButtonMediaWrapper>
        <Typography variant="h5">Compact</Typography>
      </Button>

      <Button
        sx={{ py: 8 }}
        color="secondary"
        active={isExpanded}
        onClick={() => setIsExpanded(true)}
      >
        <ButtonMediaWrapper>
          <GridViewRoundedIcon
            sx={{
              ...buttonMediaSx,
              transform: "rotate(10deg) translateY(-15%) translateX(20%)",
            }}
          />
        </ButtonMediaWrapper>
        <Typography variant="h5">Full</Typography>
      </Button>
    </>
  );
}
