import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "tools",
};

import { BoxM } from "@/components/Motion";
import { Typography } from "@mui/material";
import { cookies } from "next/headers";

export default async function Manager() {
  const cookie = cookies();
  console.log(cookie);
  await new Promise((res) => setTimeout(res, 7000));

  return (
    <BoxM
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Typography variant="h4">Manager</Typography>
    </BoxM>
  );
}
