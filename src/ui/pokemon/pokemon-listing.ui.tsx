import { Children, cloneElement, JSX } from "react";
import { PokemonListingResponse } from "@/schemas";

export type PokemonListingProps = {
  pokemonList: PokemonListingResponse;
};

export default function PokemonListing({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <ul className="grid xl:gap-x-10 xl:gap-y-8 xl:grid-cols-6 md:grid-cols-4 md:gap-x-8 md:gap-y-6 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-4 grid-cols-2 gap-x-4 gap-y-2 min-h-1/2">
      {Children.map(children, (child) => {
        const $element = cloneElement(child, {
          ...child.props,
          className: `cursor-pointer hover:shadow-xl border h-45 border ${child.props.className || ""}`,
        });
        return $element;
      })}
    </ul>
  );
}
