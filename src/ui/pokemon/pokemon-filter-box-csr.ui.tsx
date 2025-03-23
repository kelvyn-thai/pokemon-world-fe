"use client";

import Link from "next/link";
import { useMemo } from "react";
import useSWR from "swr";
import { PokemonListingResponse } from "@/schemas";
import { pokemonService } from "@/services";
import { convertToURLSearchParams } from "@/utils";
import PokemonFilterBox from "./pokemon-filter-box.ui";

export default function PokemonFilterBoxCSR({
  type: selectedType,
  page,
}: {
  type: string;
  page: number;
}) {
  const { data, isLoading, error } = useSWR(
    "$POKEMON_LISTING_TYPES",
    async () => {
      const response: PokemonListingResponse =
        await pokemonService.getPokemonTypesList();

      const types: string[] = response.results.map((result) => result.name);

      return { types };
    },
  );

  const types = useMemo(() => data?.types || [], [data?.types]);

  const selectedTypes = useMemo(
    () => (selectedType.length > 0 ? selectedType.split(",") : []),
    [selectedType],
  );

  if ((isLoading && !data?.types) || error) {
    return <PokemonFilterBox.SkeletonLoader />;
  }

  return (
    <PokemonFilterBox>
      {types.map((type) => {
        const isSelected = selectedTypes.includes(type);
        return (
          <Link
            key={type}
            className={`border text-black min-w-16 px-2 py-4 text-center ${selectedTypes.includes(type) && "text-white bg-blue-500"}`}
            href={`/pokemon-csr?${convertToURLSearchParams({
              page,
              type: isSelected
                ? selectedTypes.filter((t) => t !== type)
                : [...selectedTypes, type],
            })}`}
          >
            {type}
          </Link>
        );
      })}
    </PokemonFilterBox>
  );
}
