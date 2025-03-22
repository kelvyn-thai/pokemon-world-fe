import Image from "next/image";
import { FormattedPokemon } from "@/schemas";

export default function PokemonCard({
  formattedPokemon,
}: {
  formattedPokemon: FormattedPokemon;
}) {
  return (
    <div
      className="flex flex-col justify-center items-center gap-y-4 cursor-pointer hover:shadow-xl border"
      data-testid={formattedPokemon.id}
    >
      <p>{formattedPokemon.name}</p>
      <div className="relative w-full aspect-square max-w-24">
        <Image
          src={formattedPokemon.avatarUrl}
          alt={formattedPokemon.name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <p>Number: {formattedPokemon.id}</p>
    </div>
  );
}
