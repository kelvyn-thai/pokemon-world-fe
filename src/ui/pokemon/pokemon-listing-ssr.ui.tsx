import { Children, cloneElement, JSX } from "react";
import { PokemonListingResponse } from "@/schemas";

export type PokemonListingProps = {
  pokemonList: PokemonListingResponse;
};

export default function PokemonListingSSR({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <ul className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-x-10 gap-y-8 min-h-1/2">
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
