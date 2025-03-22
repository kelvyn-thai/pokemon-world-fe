"use client";
import { generateFakePokemonListing } from "@/mock";
import { PokemonListing } from "@/ui/pokemon";
export default function PokemonCSR() {
  return (
    <div>
      <PokemonListing list={generateFakePokemonListing()} />
    </div>
  );
}
