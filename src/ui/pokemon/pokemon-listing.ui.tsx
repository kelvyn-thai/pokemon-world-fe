import { FormattedPokemon } from "@/schemas";
import PokemonCard from "./pokemon-card.ui";

export type PokemonListingProps = {
  list: FormattedPokemon[];
};

export default function PokemonListing({ list }: PokemonListingProps) {
  return (
    <ul className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-x-10 gap-y-8">
      {list.map((pokemon) => (
        <PokemonCard key={pokemon.id} formattedPokemon={pokemon} />
      ))}
    </ul>
  );
}
