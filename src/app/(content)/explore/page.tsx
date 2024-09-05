import { validateSession } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  await validateSession();

  redirect("/explore/view/newest");
}
