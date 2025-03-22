import { faker } from "@faker-js/faker";
import {
  generateFakePokemonListing,
  generateFakePokemonTypesFormatted,
} from "@/mock";
import {
  PokemonListing,
  PokemonGreeting,
  PokemonFilterBox,
} from "@/ui/pokemon";
import PokemonPaginationBox from "@/ui/pokemon/pokemon-pagination-box.ui";

export default function PokemonSSR() {
  return (
    <div>
      <PokemonGreeting />
      <PokemonFilterBox
        {...{
          count: faker.number.int({ min: 20, max: 40 }),
          types: generateFakePokemonTypesFormatted().data,
        }}
      />
      <PokemonListing list={generateFakePokemonListing()} />
      <PokemonPaginationBox
        {...{
          next: faker.internet.url(),
          previous: faker.internet.url(),
          // onClickPrevious: () => {
          //   console.debug("previous");
          // },
          // onClickNext: () => {
          //   console.debug("next");
          // },
        }}
      />
    </div>
  );
}
