import { cookies } from "next/headers";

export default async function Header() {
  const cookie = cookies();
  console.log(cookie);
  await new Promise((res) => setTimeout(res, 5000));
  return <div>Manager</div>;
}
