import { notFound } from "next/navigation";

export async function getProjectId(slug: string) {
  let id: string | null = null;

  if (slug === "newest") {
    // TODO: get the newest project id, if not found, set id to null
    id = "newest";
  }

  if (Number.isInteger(Number(slug)) && Number(slug) >= 0) {
    // TODO: get the project id by index, if not found, set id to null
    id = "something";
  }

  if (id === null) {
    notFound();
  }

  return id;
}
