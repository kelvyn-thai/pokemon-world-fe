"use client";

import Link from "next/link";

export type IPokemonPaginationBox = {
  page: number;
  totalPages: number;
};
export default function PokemonPaginationBox({
  page,
  totalPages,
}: IPokemonPaginationBox) {
  const previous = page > 1 ? page - 1 : page;
  const next = page < totalPages ? page + 1 : page;
  return (
    <div className="flex flex-row justify-center items-center gap-5 m-5">
      <Link
        href={`/pokemon-csr?page=${previous}`}
        className={`bg-blue-500 text-white px-2 py-2 min-w-20 rounded-4 text-center ${page === 1 && "cursor-not-allowed opacity-50"}`}
      >
        Previous
      </Link>
      <Link
        href={`/pokemon-csr?page=${next}`}
        className={`bg-blue-500 text-white px-2 py-2 min-w-20 rounded-4 text-center ${page === totalPages && "cursor-not-allowed opacity-50"}`}
      >
        Next
      </Link>
    </div>
  );
}
