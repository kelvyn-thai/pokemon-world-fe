import { Suspense } from "react";
import { LIMIT_PER_PAGE } from "@/constants";
import { FormattedPokemon } from "@/schemas";
import { PokemonListingResponse } from "@/schemas/pokemon/pokemon-listing-response.shema";
import { pokemonService } from "@/services";
import {
  PokemonGreeting,
  PokemonFilterBoxSSR,
  PokemonListing,
  PokemonPaginationBoxSSR,
} from "@/ui/pokemon";
import { extractQueryParams, getPreferredPokemonImage } from "@/utils";

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
    offset: _offset,
    type = "",
  }: {
    offset: number;
    type: string;
  } = params;

  const offset = Number(_offset);

  const limit = LIMIT_PER_PAGE;

  const [pokemonList, typeList]: [
    PokemonListingResponse,
    PokemonListingResponse,
  ] = await Promise.all([
    pokemonService.getPokemonList({ offset, limit, type }),
    pokemonService.getPokemonTypesList(),
  ]);

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

  const typesList = typeList.results.map((result) => result.name);

  const nextQuery = extractQueryParams(pokemonList.next);
  const prevQuery = extractQueryParams(pokemonList.previous);

  return (
    <section>
      <PokemonGreeting />
      <Suspense fallback={<div>Loading list types...</div>}>
        <PokemonFilterBoxSSR
          {...{
            count: pokemonList.count,
            types: typesList,
            offset,
            limit,
            type,
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
