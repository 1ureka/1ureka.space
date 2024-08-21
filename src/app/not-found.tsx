import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "404",
};

import ErrorBlock from "@/components/ErrorBlock";

export default function NotFound() {
  return <ErrorBlock error={new Error("404: Page not found")} />;
}
