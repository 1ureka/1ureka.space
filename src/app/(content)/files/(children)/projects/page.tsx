import { validateSession } from "@/auth";
import Block from "@/components/Block";
import Table from "@/components/(files)/ExploreTable";
import { delay } from "@/utils/server-utils";

const getFakeMetadata = async () => {
  await delay(Math.random() * 1000);

  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return Array.from({ length: 12 }, (_, i) => ({
    id: i.toString(),
    group: `Project ${randomInt(1, 5)}`,
    camera: randomInt(1, 3),
    tag: `Tag ${randomInt(1, 5)}`,
    detail: `Description ${randomInt(1, 5)}`,
    metadataId: i.toString(),
  }));
};

export default async function Page() {
  await validateSession();

  const metadataList = await getFakeMetadata();

  return (
    <Block sx={{ gridArea: "content" }}>
      <Table list={metadataList} />
    </Block>
  );
}
