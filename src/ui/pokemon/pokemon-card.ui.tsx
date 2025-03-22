import Image from "next/image";
import { FormattedPokemon } from "@/schemas";

export default function PokemonCard({
  formattedPokemon,
}: {
  formattedPokemon: FormattedPokemon;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 cursor-pointer hover:shadow">
      <p>{formattedPokemon.name}</p>
      <div className="relative w-full aspect-square max-w-24">
        <Image
          src={formattedPokemon.avatarGifUrl}
          alt={formattedPokemon.name}
          fill
          className="object-contain"
        />
      </div>
      <p>Number: {formattedPokemon.id}</p>
    </div>
  );
}
