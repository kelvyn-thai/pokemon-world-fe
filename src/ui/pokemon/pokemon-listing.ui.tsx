import { FormattedPokemon } from "@/schemas";
import PokemonCard from "./pokemon-card.ui";

export type PokemonListingProps = {
  list: FormattedPokemon[];
};

export default function PokemonListing({ list }: PokemonListingProps) {
  return (
    <div>
      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] gap-x-10 gap-y-8">
        {list.map((pokemon) => (
          <PokemonCard key={pokemon.id} formattedPokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}
