"use client";
import { RecoilRoot } from "recoil";

export default function ContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
