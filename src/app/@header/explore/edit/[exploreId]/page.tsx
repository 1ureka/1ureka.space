export default function EditHeaderPage({
  params: { exploreId },
}: {
  params: { exploreId: string };
}) {
  return (
    <div>
      <h1>Edit Explore Header Page</h1>
      <p>Explore ID: {exploreId}</p>
    </div>
  );
}
