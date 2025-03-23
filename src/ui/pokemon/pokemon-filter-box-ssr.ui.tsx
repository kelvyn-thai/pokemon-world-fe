import Link from "next/link";
import React, { use, JSX } from "react";
import { PokemonListingResponse } from "@/schemas";
import { pokemonService } from "@/services";
import { convertToURLSearchParams } from "@/utils";

export type IPokemonFilterBox = {
  offset: number;
  limit: number;
  type: string;
};

export const SkeletonLoader = () => {
  return (
    <PokemonFilterBoxSSR>
      {[...Array(20)].map((_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="animate-pulse bg-gray-200"
        />
      ))}
    </PokemonFilterBoxSSR>
  );
};

export const FilterBoxTypes = ({
  offset = 0,
  limit,
  type: selectedType,
}: IPokemonFilterBox) => {
  const typeList: PokemonListingResponse = use(
    pokemonService.getPokemonTypesList(),
  );

  const types = typeList?.results?.map((result) => result.name) || [];

  const selectedTypes = selectedType.length > 0 ? selectedType.split(",") : [];

  return (
    <PokemonFilterBoxSSR>
      {types.map((type) => {
        const isSelected = selectedTypes.includes(type);
        return (
          <Link
            key={type}
            className={`${isSelected && "text-white bg-blue-500"}`}
            href={`/pokemon-ssr?${convertToURLSearchParams({
              offset,
              limit,
              type: isSelected
                ? selectedTypes.filter((t) => t !== type)
                : [...selectedTypes, type],
            })}`}
          >
            {type}
          </Link>
        );
      })}
    </PokemonFilterBoxSSR>
  );
};

export default function PokemonFilterBoxSSR({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <ul className="flex flex-wrap flex-row gap-4 mb-5 min-h-36">
      <li className="text-black w-fit flex items-center h-10">Types:</li>
      {React.Children.map(children, (child: JSX.Element) =>
        React.cloneElement(child, {
          ...child.props,
          className: `text-black border min-w-16 flex items-center justify-center px-4 h-10 ${child.props.className || ""}`,
        }),
      )}
    </ul>
  );
}

PokemonFilterBoxSSR.FilterBoxTypes = FilterBoxTypes;
PokemonFilterBoxSSR.SkeletonLoader = SkeletonLoader;
