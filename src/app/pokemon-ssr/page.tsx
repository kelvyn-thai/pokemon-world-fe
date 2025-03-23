import { Suspense } from "react";
import { LIMIT_PER_PAGE } from "@/constants";
import { PokemonListingResponse } from "@/schemas/pokemon/pokemon-listing-response.shema";
import { pokemonService } from "@/services";
import {
  PokemonGreeting,
  PokemonFilterBox,
  PokemonListing,
  PokemonPaginationBoxSSR,
  PokemonTotalCount,
  PokemonCard,
  PokemonFilterBoxSSR,
} from "@/ui/pokemon";
import { extractQueryParams } from "@/utils";

const limit = LIMIT_PER_PAGE;

export default async function PokemonSSR({
  searchParams,
}: {
  searchParams: Promise<{
    offset: number;
    type: string;
  }>;
}) {
  const params = await searchParams;

  const {
    offset: _offset = 0,
    type = "",
  }: {
    offset: number;
    type: string;
  } = params;

  const offset = Number(_offset);

  const pokemonList: PokemonListingResponse =
    await pokemonService.getPokemonList({ offset, limit, type });

  const nextQuery = extractQueryParams(pokemonList.next);
  const prevQuery = extractQueryParams(pokemonList.previous);

  return (
    <section className="px-5">
      <PokemonGreeting />
      <PokemonTotalCount totalCount={pokemonList.count || 0} />
      <Suspense fallback={<PokemonFilterBox.SkeletonLoader />}>
        <PokemonFilterBoxSSR
          {...{
            offset,
            limit,
            type,
          }}
        />
      </Suspense>
      <PokemonListing>
        {pokemonList.results.map((pokemon) => (
          <Suspense
            key={pokemon.name}
            fallback={<PokemonCard.SkeletonLoader />}
          >
            <PokemonCard.CardSSR key={pokemon.name} url={pokemon.url} />
          </Suspense>
        ))}
      </PokemonListing>
      <PokemonPaginationBoxSSR
        {...{
          next: nextQuery,
          previous: prevQuery,
        }}
      />
    </section>
  );
}
