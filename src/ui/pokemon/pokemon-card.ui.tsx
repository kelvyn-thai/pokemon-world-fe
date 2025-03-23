import Image from "next/image";
import { use } from "react";
import { FormattedPokemon, FormattedPokemonSchema } from "@/schemas";
import { pokemonService } from "@/services";
import { getPreferredPokemonImage } from "@/utils";

export const SkeletonLoader = () => {
  return (
    <li className="animate-pulse cursor-pointer hover:shadow-xl border h-45 bg-gray-200" />
  );
};

export const CardSSR = ({ url }: { url: string }) => {
  const pokemon = use(pokemonService.getPokemonByURL({ url }));

  const formattedPokemon = FormattedPokemonSchema.parse({
    ...pokemon,
    avatarUrl: getPreferredPokemonImage(pokemon),
  });

  return <PokemonCard formattedPokemon={formattedPokemon} />;
};

export default function PokemonCard({
  formattedPokemon,
}: {
  formattedPokemon: FormattedPokemon;
}) {
  return (
    <li
      className="flex flex-col justify-center items-center gap-y-4 cursor-pointer hover:shadow-xl border h-45"
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
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII="
          placeholder="blur"
        />
      </div>
      <p>Number: {formattedPokemon.id}</p>
    </li>
  );
}

PokemonCard.CardSSR = CardSSR;
PokemonCard.SkeletonLoader = SkeletonLoader;
