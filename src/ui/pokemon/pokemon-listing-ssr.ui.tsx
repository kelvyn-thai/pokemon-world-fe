import { FormattedPokemon } from "@/schemas";
import PokemonCard from "./pokemon-card.ui";

export default function PokemonListingSSR({
  list,
}: {
  list: FormattedPokemon[];
}) {
  return (
    <div>
      <ul className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-x-10 gap-y-8">
        {list.map((pokemon) => (
          <PokemonCard key={pokemon.id} formattedPokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}
