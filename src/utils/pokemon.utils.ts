import { PokemonEntity } from "@/schemas";

export const getPreferredPokemonImage = (pokemon: PokemonEntity): string => {
  return (
    pokemon.sprites?.other?.showdown?.front_default ??
    pokemon.sprites?.other?.["official-artwork"]?.front_default ??
    pokemon.sprites?.other?.home?.front_default ??
    pokemon.sprites?.front_default ??
    "/pokemon_fallback.webp"
  );
};
