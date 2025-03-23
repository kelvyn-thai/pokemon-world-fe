"use client";

import { useRouter } from "next/navigation";
import { convertToURLSearchParams } from "@/utils";

export type IPokemonPaginationBox = {
  page: number;
  totalPages: number;
  type: string;
};

export default function PokemonPaginationBoxCSR({
  page,
  totalPages,
  type,
}: IPokemonPaginationBox) {
  const router = useRouter();
  const previousPage = Math.max(1, page - 1);
  const nextPage = page + 1;
  const isDisabledPrev = page === 1;
  const isDisabledNext = nextPage > totalPages;

  return (
    <div className="flex flex-row justify-center items-center gap-5 m-5">
      <button
        onClick={() => {
          if (isDisabledPrev) {
            return;
          }
          router.push(
            `/pokemon-csr?${convertToURLSearchParams({
              page: previousPage,
              type,
            })}`,
          );
        }}
        className={`bg-blue-500 text-white px-2 py-2 min-w-20 rounded-4 text-center ${page === 1 && "cursor-not-allowed opacity-50"}`}
      >
        Previous
      </button>
      <button
        onClick={() => {
          if (isDisabledNext) {
            return;
          }
          router.push(
            `/pokemon-csr?${convertToURLSearchParams({
              page: nextPage,
              type,
            })}`,
          );
        }}
        className={`bg-blue-500 text-white px-2 py-2 min-w-20 rounded-4 text-center ${nextPage > totalPages && "cursor-not-allowed opacity-50"}`}
      >
        Next
      </button>
    </div>
  );
}
