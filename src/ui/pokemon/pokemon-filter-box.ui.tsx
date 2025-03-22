"use client";

import { useState } from "react";

export type IPokemonFilterBox = {
  types: string[];
  count: number;
};

export default function PokemonFilterBox({ types, count }: IPokemonFilterBox) {
  const [selected, setSelected] = useState<string[]>([]);
  const handleChangeType = (type: string) => {
    const isSelected = selected.includes(type);
    if (isSelected) {
      setSelected((prevState) => [...prevState].filter((t) => t !== type));
    } else {
      setSelected((prevState) => [...prevState, type]);
    }
  };
  return (
    <div className="mb-5">
      <h2 className="font-medium text-neutral-1000 mb-4">
        {" "}
        Total Count: {count}
      </h2>
      <div>
        <ul className="flex flex-wrap flex-row gap-4">
          <li className="text-black  rounded-4 min-w-6 px-2 py-4 text-center">
            Types
          </li>
          {types.map((type) => {
            return (
              <button
                key={type}
                onClick={() => handleChangeType(type)}
                className={`border text-black min-w-16 px-2 py-4 text-center ${selected.includes(type) && "text-white bg-blue-500"}`}
              >
                {type}
              </button>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
