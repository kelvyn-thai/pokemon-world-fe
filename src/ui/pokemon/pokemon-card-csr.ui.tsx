"use client";

import useSWR from "swr";
import {
  FormattedPokemon,
  FormattedPokemonSchema,
  PokemonEntity,
} from "@/schemas";
import { pokemonService } from "@/services";
import { getPreferredPokemonImage } from "@/utils";
import PokemonCard from "./pokemon-card.ui";

const PokemonCardCSR = ({ url }: { url: string }) => {
  const { data, isLoading, error } = useSWR(`$POKEMON-${url}`, async () => {
    const pokemon: PokemonEntity = await pokemonService.getPokemonByURL({
      url,
    });

    return {
      formattedPokemon: FormattedPokemonSchema.parse({
        ...pokemon,
        avatarUrl: getPreferredPokemonImage(pokemon),
      }),
    };
  });

  if ((isLoading && !data?.formattedPokemon) || error) {
    return <PokemonCard.SkeletonLoader />;
  }

  return (
    <PokemonCard
      formattedPokemon={data?.formattedPokemon as FormattedPokemon}
    />
  );
};

export default PokemonCardCSR;
