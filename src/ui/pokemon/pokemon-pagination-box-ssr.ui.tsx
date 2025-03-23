import PokemonPaginationBox from "./pokemon-pagination-box.ui";

export type IPokemonPaginationBox = {
  next: string | null;

  previous: string | null;
};
export default function PokemonPaginationBoxSSR({
  next,
  previous,
}: IPokemonPaginationBox) {
  return (
    <PokemonPaginationBox>
      <PokemonPaginationBox.PaginationLink
        href={previous ?? `/pokemon-ssr${previous}`}
        isDisabled={!previous}
      >
        Previous
      </PokemonPaginationBox.PaginationLink>

      <PokemonPaginationBox.PaginationLink
        href={next ?? `/pokemon-ssr${next}`}
        isDisabled={!next}
      >
        Next
      </PokemonPaginationBox.PaginationLink>
    </PokemonPaginationBox>
  );
}
