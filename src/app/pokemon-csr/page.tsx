"use client";
import Link from "next/link";
import { use, useRef } from "react";
import useSWR, { SWRConfig } from "swr";
import { LIMIT_PER_PAGE } from "@/constants";
import {
  FormattedPokemon,
  PokemonEntity,
  PokemonListingResponse,
} from "@/schemas";
import { pokemonService } from "@/services";
import {
  PokemonFilterBox,
  PokemonGreeting,
  PokemonListing,
} from "@/ui/pokemon";
import PokemonPaginationBox from "@/ui/pokemon/pokemon-pagination-box.ui";
import { getTotalPagesFromCount } from "@/utils/pagination.utils";

export default function PokemonCSR({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const totalCountRef = useRef<{ count: number; totalPages: number }>({
    count: 0,
    totalPages: 1,
  });

  const { page = 1 }: { page: number } = use(searchParams);

  const { data: dataTypesResponse } = useSWR<{ types: string[] }>(
    "types",
    async () => {
      const res = await pokemonService.getPokemonTypesList();

      const types = res.results.map((result) => result.name);

      return { types };
    },
  );

  const { data, isLoading } = useSWR<{
    pokemonList: PokemonListingResponse;
    pokemonDetailList: PokemonEntity[];
    formattedPokemonList: FormattedPokemon[];
  }>(
    `${page}`,
    async () => {
      const limit = LIMIT_PER_PAGE;
      const offset = (page >= 1 ? page - 1 : page) * limit;
      const res = await pokemonService.getPokemonFullInfo({ limit, offset });

      if (!totalCountRef.current.count) {
        totalCountRef.current.count = res.pokemonList.count;
        totalCountRef.current.totalPages = getTotalPagesFromCount(
          res.pokemonList.count,
        );
      }

      return res;
    },
    { refreshInterval: 30 * 1000 },
  );

  return (
    <SWRConfig>
      <section>
        <PokemonGreeting />
        <PokemonFilterBox
          {...{
            count: totalCountRef.current.count,
            types: dataTypesResponse?.types || [],
          }}
        />
        <PokemonListing list={data?.formattedPokemonList || []} />
        {!isLoading && (
          <PokemonPaginationBox
            {...{
              page: Number(page),
              totalPages: totalCountRef.current.totalPages,
            }}
          />
        )}
        <Link
          className="hidden"
          href={`/pokemon-csr/${Number(page) + 1}`}
          prefetch
        />
      </section>
    </SWRConfig>
  );
}
