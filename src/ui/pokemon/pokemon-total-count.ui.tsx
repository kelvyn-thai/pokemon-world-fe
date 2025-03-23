export default function PokemonTotalCount({
  totalCount,
}: {
  totalCount: number;
}) {
  return (
    <h2 className="font-medium text-neutral-1000 mb-4">
      Total Count: {totalCount}
    </h2>
  );
}
