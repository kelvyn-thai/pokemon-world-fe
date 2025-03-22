import { generateFakePokemonListing } from "@/mock";
import { PokemonListing } from "@/ui/pokemon";

export default function PokemonSSR() {
  return (
    <div>
      <PokemonListing list={generateFakePokemonListing()} />
    </div>
  );
}
