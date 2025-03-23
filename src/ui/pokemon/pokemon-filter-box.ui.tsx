"use client";

import Link from "next/link";
import { convertToURLSearchParams } from "@/utils";

export type IPokemonFilterBox = {
  type: string;
  types: string[];
  page: number;
};

export default function PokemonFilterBox({
  types,
  type: selectedType,
  page,
}: IPokemonFilterBox) {
  const selectedTypes = selectedType.length > 0 ? selectedType.split(",") : [];

  return (
    <div className="mb-5">
      <div>
        <ul className="flex flex-wrap flex-row gap-4">
          <li className="text-black  rounded-4 min-w-6 px-2 py-4 text-center">
            Types
          </li>
          {types.map((type) => {
            const isSelected = selectedTypes.includes(type);
            return (
              <Link
                key={type}
                className={`border text-black min-w-16 px-2 py-4 text-center ${selectedTypes.includes(type) && "text-white bg-blue-500"}`}
                href={`/pokemon-csr?${convertToURLSearchParams({
                  page,
                  type: isSelected
                    ? selectedTypes.filter((t) => t !== type)
                    : [...selectedTypes, type],
                })}`}
              >
                {type}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
