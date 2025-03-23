import Link, { LinkProps } from "next/link";
import { Children, cloneElement, JSX } from "react";

export const PaginationBtn = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isDisabled: boolean;
  },
) => {
  return <button {...props} />;
};

export const PaginationLink = (
  props: LinkProps & { isDisabled: boolean; children: JSX.Element | string },
) => {
  const { isDisabled, children } = props;

  if (isDisabled) {
    return <span {...props}>{children}</span>;
  }
  return <Link {...props}>{children}</Link>;
};

export default function PokemonPaginationBox({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <ul className="flex flex-row justify-center items-center gap-5 m-5">
      {Children.map(children, (child: JSX.Element) => {
        return cloneElement(child, {
          ...child.props,
          className: `bg-blue-500 text-white px-2 py-2 min-w-20 rounded-4 text-center hover:bg-blue-600 ${child.props?.isDisabled && "cursor-not-allowed opacity-50"}`,
        });
      })}
    </ul>
  );
}

PokemonPaginationBox.PaginationBtn = PaginationBtn;
PokemonPaginationBox.PaginationLink = PaginationLink;
