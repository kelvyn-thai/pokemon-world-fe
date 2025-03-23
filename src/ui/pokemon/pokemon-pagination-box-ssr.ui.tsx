import Link from "next/link";

export type IPokemonPaginationBox = {
  next: string | null;

  previous: string | null;
};
export default function PokemonPaginationBoxSSR({
  next,
  previous,
}: IPokemonPaginationBox) {
  return (
    <div className="flex flex-row justify-center items-center gap-5 m-5">
      {previous ? (
        <Link
          href={previous ?? `/pokemon-ssr${previous}`}
          className={`bg-blue-500 text-white px-2 py-2 min-w-20 rounded-4 text-center`}
        >
          Previous
        </Link>
      ) : (
        <span
          className={`bg-blue-500 text-white px-2 py-2 min-w-20 rounded-4 text-center ${!previous && "cursor-not-allowed opacity-50"}`}
        >
          Previous
        </span>
      )}

      {next ? (
        <Link
          href={next ?? `/pokemon-ssr${next}`}
          className={`bg-blue-500 text-white px-2 py-2 min-w-20 rounded-4 text-center ${!next && "cursor-not-allowed"}`}
        >
          Next
        </Link>
      ) : (
        <span
          className={`bg-blue-500 text-white px-2 py-2 min-w-20 rounded-4 text-center ${!next && "cursor-not-allowed opacity-50"}`}
        >
          Next
        </span>
      )}
    </div>
  );
}
