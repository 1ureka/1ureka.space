"use client";

import { ButtonBase, type ButtonBaseProps } from "@mui/material";
import { useParams } from "next/navigation";

interface ButtonProps {
  group: string;
  name: string;
  children: React.ReactNode;
}

export default function Button({
  group,
  name,
  children,
  ...props
}: ButtonProps & ButtonBaseProps) {
  const isExpanded = useParams().isExpanded === "true";

  // if isExpanded || CURRENT === group then handleImageClick, else handleGroupClick

  const handleImageClick = () => {
    // set carousels {open : true, name}
  };

  const handleGroupClick = () => {
    // set CURRENT to group
  };

  return (
    <ButtonBase
      onClick={isExpanded || true ? handleImageClick : handleGroupClick}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}
