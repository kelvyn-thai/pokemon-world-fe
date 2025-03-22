"use client";

export type IPokemonPaginationBox = {
  next: string | null;

  previous: string | null;

  onClickNext?: () => void;

  onClickPrevious?: () => void;
};
export default function PokemonPaginationBox({
  next,
  previous,
  onClickNext,
  onClickPrevious,
}: IPokemonPaginationBox) {
  return (
    <div className="flex flex-row justify-center items-center gap-5 m-5">
      {previous && (
        <button
          className="bg-blue-500 text-white px-2 py-2 min-w-20 rounded-4"
          onClick={() =>
            typeof onClickPrevious === "function" && onClickPrevious()
          }
        >
          Previous
        </button>
      )}
      {next && (
        <button
          className="bg-blue-500 text-white px-2 py-2 min-w-20 rounded-4"
          onClick={() => typeof onClickNext === "function" && onClickNext()}
        >
          Next
        </button>
      )}
    </div>
  );
}
