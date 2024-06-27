import { Button } from "..";

export default async function Illustration({
  category,
  name,
  group,
}: {
  category: string;
  name: string;
  group: string;
}) {
  const dataUrl = ""; // TODO: fetch await getImage(category, name)

  return (
    // a client wrapper (check weather a best practice)
    <Button group={group} name={name}>
      {"image"}
    </Button>
  );
}
