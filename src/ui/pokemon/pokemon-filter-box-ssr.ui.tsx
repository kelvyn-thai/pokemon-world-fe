import Link from "next/link";
import { convertToURLSearchParams } from "@/utils";

export type IPokemonFilterBox = {
  types: string[];
  count: number;
  offset: number;
  limit: number;
  type: string;
};

export default function PokemonFilterBoxSSR({
  types,
  count,
  offset,
  limit,
  type: selectedType,
}: IPokemonFilterBox) {
  const selectedTypes = selectedType.length > 0 ? selectedType.split(",") : [];

  return (
    <div className="mb-5">
      <h2 className="font-medium text-neutral-1000 mb-4">
        Total Count: {count}
      </h2>
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
        </ul>
      </div>
    </div>
  );
}
