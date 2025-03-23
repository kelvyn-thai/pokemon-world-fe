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
  debugger;
  const pokemon = use(pokemonService.getPokemonByURL({ url }));

  const { success, data, error } = FormattedPokemonSchema.safeParse({
    ...pokemon,
    avatarUrl: getPreferredPokemonImage(pokemon),
  });

  if (!data || !success || error) {
    return <PokemonCard.SkeletonLoader />;
  }
  return <PokemonCard formattedPokemon={data} />;
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
      <p className="font-medium truncate text-neutral-800 max-w-[calc(100%_-_32px)]">
        {formattedPokemon.name}
      </p>
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
      <p className="text-sm leading-4 truncate text-neutral-900 max-w-[calc(100%_-_32px)]">
        Number: {formattedPokemon.id}
      </p>
    </li>
  );
}

PokemonCard.CardSSR = CardSSR;
PokemonCard.SkeletonLoader = SkeletonLoader;
