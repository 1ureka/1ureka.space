import { validateSession } from "@/auth";
import { getAllExploreMetadata } from "@/data/metadata";
import Block from "@/components/Block";
import Table from "@/components/(files)/ExploreTable";

export default async function Page() {
  await validateSession();

  const metadataList = (await getAllExploreMetadata()).map(
    ({ metadata, ...data }) => ({
      ...data,
      group: metadata.group,
    })
  );

  return (
    <Block sx={{ gridArea: "content" }}>
      <Table list={metadataList} />
    </Block>
  );
}
