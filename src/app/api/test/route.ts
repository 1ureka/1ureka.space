import { generateFakeData } from "@/data/table";
import { NextResponse } from "next/server";

export const GET = async () => {
  await generateFakeData();
  return NextResponse.json(null, { status: 200 });
};
