"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { convertToURLSearchParams } from "@/utils";
import PokemonPaginationBox from "./pokemon-pagination-box.ui";

const PokemonPaginationBoxCSR = ({
  page,
  totalPages,
  type,
}: {
  page: number;
  totalPages: number;
  type: string;
}) => {
  const router = useRouter();

  const { previousPage, nextPage, isDisabledPrev, isDisabledNext } =
    useMemo(() => {
      const previousPage = Math.max(1, page - 1);
      const nextPage = page + 1;
      const isDisabledPrev = page === 1;
      const isDisabledNext = nextPage > totalPages;

      return {
        previousPage,
        nextPage,
        isDisabledPrev,
        isDisabledNext,
      };
    }, [page, totalPages]);

  return (
    <PokemonPaginationBox>
      <PokemonPaginationBox.PaginationBtn
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
        isDisabled={page === 1}
      >
        Previous
      </PokemonPaginationBox.PaginationBtn>
      <PokemonPaginationBox.PaginationBtn
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
        isDisabled={nextPage > totalPages}
      >
        Next
      </PokemonPaginationBox.PaginationBtn>
    </PokemonPaginationBox>
  );
};

export default PokemonPaginationBoxCSR;
