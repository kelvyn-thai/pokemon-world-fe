import { Suspense } from "react";
import { LIMIT_PER_PAGE } from "@/constants";
import { FormattedPokemon } from "@/schemas";
import { PokemonListingResponse } from "@/schemas/pokemon/pokemon-listing-response.shema";
import { pokemonService } from "@/services";
import {
  PokemonGreeting,
  PokemonFilterBox,
  PokemonListing,
  PokemonPaginationBoxSSR,
} from "@/ui/pokemon";
import { extractQueryParams } from "@/utils";

export default async function PokemonSSR({
  searchParams,
}: {
  searchParams: Promise<{
    offset: number;
    limit: number;
  }>;
}) {
  const {
    offset = 0,
    limit = LIMIT_PER_PAGE,
  }: { offset: number; limit: number } = await searchParams;

  const [pokemonList, typeList]: [
    PokemonListingResponse,
    PokemonListingResponse,
  ] = await Promise.all([
    pokemonService.getPokemonList({ offset, limit }),
    pokemonService.getPokemonTypesList(),
  ]);

  const pokemonDetailList = await Promise.all([
    ...pokemonList.results.map((result) =>
      pokemonService.getPokemonByURL({ url: result.url }),
    ),
  ]);

  const formattedPokemonList: FormattedPokemon[] = pokemonDetailList.map(
    (p) =>
      ({
        ...p,
        avatarPngUrl: p.sprites.front_default,
        avatarGifUrl: p.sprites.other.showdown.front_default,
      }) as FormattedPokemon,
  );

  const types = typeList.results.map((result) => result.name);

  const nextQuery = extractQueryParams(pokemonList.next);
  const prevQuery = extractQueryParams(pokemonList.previous);

  return (
    <section>
      <PokemonGreeting />
      <Suspense fallback={<div>Loading list types...</div>}>
        <PokemonFilterBox
          {...{
            count: pokemonList.count,
            types,
          }}
        />
      </Suspense>
      <Suspense fallback={<div>Loading list pokemon....</div>}>
        <PokemonListing list={formattedPokemonList} />
      </Suspense>
      <PokemonPaginationBoxSSR
        {...{
          next: nextQuery,
          previous: prevQuery,
        }}
      />
    </section>
  );
}
