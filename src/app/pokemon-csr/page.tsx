"use client";
import Link from "next/link";
import { use, useMemo } from "react";
import useSWR, { SWRConfig } from "swr";
import { LIMIT_PER_PAGE } from "@/constants";
import {
  FormattedPokemon,
  PokemonEntity,
  PokemonListingResponse,
} from "@/schemas";
import { pokemonService } from "@/services";
import {
  PokemonFilterBoxCSR,
  PokemonGreeting,
  PokemonListing,
  PokemonPaginationBoxCSR,
  PokemonTotalCount,
} from "@/ui/pokemon";
import { getPreferredPokemonImage } from "@/utils";
import { getTotalPagesFromCount } from "@/utils/pagination.utils";

export default function PokemonCSR({
  searchParams,
}: {
  searchParams: Promise<{ page: number; type: string }>;
}) {
  const { page: _page = 1, type = "" } = use(searchParams);

  const page = Number(_page);

  const { data: dataTypesResponse } = useSWR<{ types: string[] }>(
    "types",
    async () => {
      const res = await pokemonService.getPokemonTypesList();

      const types = res.results.map((result) => result.name);

      return { types };
    },
  );

  const { data } = useSWR<{
    pokemonList: PokemonListingResponse;
    pokemonDetailList: PokemonEntity[];
    formattedPokemonList: FormattedPokemon[];
  }>(`$POKEMON_CSR_${page}-${type}`, async () => {
    const limit = LIMIT_PER_PAGE;
    const offset = (page >= 1 ? page - 1 : page) * limit;

    const pokemonList: PokemonListingResponse =
      await pokemonService.getPokemonList({ offset, limit, type });

    const pokemonDetailList = await Promise.all([
      ...pokemonList.results.map((result) =>
        pokemonService.getPokemonByURL({ url: result.url }),
      ),
    ]);

    const formattedPokemonList: FormattedPokemon[] = pokemonDetailList.map(
      (pokemon) =>
        ({
          ...pokemon,
          avatarUrl: getPreferredPokemonImage(pokemon),
        }) as FormattedPokemon,
    );

    return {
      pokemonList,
      pokemonDetailList,
      formattedPokemonList,
    };
  });

  const { count = 0, totalPages = 1 } = useMemo(
    () => ({
      count: data?.pokemonList?.count || 0,
      totalPages: getTotalPagesFromCount(data?.pokemonList?.count || 0),
    }),
    [data?.pokemonList],
  );

  return (
    <SWRConfig>
      <section>
        <PokemonGreeting />
        <PokemonTotalCount totalCount={count} />
        <PokemonFilterBoxCSR
          {...{
            types: dataTypesResponse?.types || [],
            type,
            page,
          }}
        />
        <PokemonListing list={data?.formattedPokemonList || []} />
        <PokemonPaginationBoxCSR
          {...{
            page,
            type,
            totalPages,
          }}
        />
        <Link className="hidden" href={`/pokemon-csr/${page + 1}`} prefetch />
      </section>
    </SWRConfig>
  );
}
