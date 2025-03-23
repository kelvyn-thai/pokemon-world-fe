"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { JSX, Suspense, use, useMemo } from "react";
import useSWR, { SWRConfig } from "swr";
import { LIMIT_PER_PAGE } from "@/constants";
import { PokemonListingResponse } from "@/schemas";
import { pokemonService } from "@/services";
import {
  PokemonCard,
  PokemonFilterBox,
  PokemonGreeting,
  PokemonListing,
  PokemonPaginationBoxCSR,
  PokemonTotalCount,
} from "@/ui/pokemon";
import { getTotalPagesFromCount } from "@/utils";

const PokemonCardCSR = dynamic(
  () => import("@/ui/pokemon/pokemon-card-csr.ui"),
  {
    ssr: false,
  },
);

const PokemonFilterBoxCSR = dynamic(
  () => import("@/ui/pokemon/pokemon-filter-box-csr.ui"),
  {
    ssr: false,
  },
);

export default function PokemonCSR({
  searchParams,
}: {
  searchParams: Promise<{ page: number; type: string }>;
}) {
  const { page: _page = 1, type = "" } = use(searchParams);

  const page = Number(_page);

  const { data } = useSWR<{
    pokemonList: PokemonListingResponse;
  }>(`$POKEMON_CSR_${page}-${type}`, async () => {
    const limit = LIMIT_PER_PAGE;
    const offset = (page >= 1 ? page - 1 : page) * limit;
    const pokemonList: PokemonListingResponse =
      await pokemonService.getPokemonList({ offset, limit, type });

    return {
      pokemonList,
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
      <section className="px-5">
        <PokemonGreeting />
        <PokemonTotalCount totalCount={count} />
        <Suspense fallback={<PokemonFilterBox.SkeletonLoader />}>
          <PokemonFilterBoxCSR
            {...{
              type,
              page,
            }}
          />
        </Suspense>
        <PokemonListing>
          {
            data?.pokemonList?.results?.map((pokemon) => (
              <Suspense
                key={pokemon.name}
                fallback={<PokemonCard.SkeletonLoader />}
              >
                <PokemonCardCSR url={pokemon.url} key={pokemon.name} />
              </Suspense>
            )) as JSX.Element[]
          }
        </PokemonListing>
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
