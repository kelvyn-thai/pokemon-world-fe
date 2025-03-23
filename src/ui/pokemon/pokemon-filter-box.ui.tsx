import React, { JSX } from "react";

export const SkeletonLoader = () => {
  return (
    <PokemonFilterBox>
      {[...Array(20)].map((_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="animate-pulse bg-gray-200"
        />
      ))}
    </PokemonFilterBox>
  );
};

export default function PokemonFilterBox({
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

PokemonFilterBox.SkeletonLoader = SkeletonLoader;
