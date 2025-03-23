import Link from "next/link";
import React, { use } from "react";
import { PokemonListingResponse } from "@/schemas";
import { pokemonService } from "@/services";
import { convertToURLSearchParams } from "@/utils";
import PokemonFilterBox from "./pokemon-filter-box.ui";

const PokemonFilterBoxSSR = ({
  offset = 0,
  limit,
  type: selectedType,
}: {
  offset: number;
  limit: number;
  type: string;
}) => {
  const typeList: PokemonListingResponse = use(
    pokemonService.getPokemonTypesList(),
  );

  const types = typeList?.results?.map((result) => result.name) || [];

  const selectedTypes = selectedType.length > 0 ? selectedType.split(",") : [];

  return (
    <PokemonFilterBox>
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
    </PokemonFilterBox>
  );
};

export default PokemonFilterBoxSSR;
