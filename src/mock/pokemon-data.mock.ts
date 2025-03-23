import { faker } from "@faker-js/faker";
import {
  PokemonEntity,
  PokemonEntitySchema,
  FormattedPokemon,
  FormattedPokemonSchema,
} from "@/schemas";
import { getPreferredPokemonImage } from "@/utils";

export const generateFakePokemon = (
  overrides?: Partial<PokemonEntity>,
): PokemonEntity => {
  const types = [
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "normal",
    "fighting",
    "flying",
  ];
  const randomType = () => ({
    slot: 1,
    type: {
      name: faker.helpers.arrayElement(types),
      url: `https://pokeapi.co/api/v2/type/${faker.number.int({ min: 1, max: 20 })}/`,
    },
  });

  return PokemonEntitySchema.parse({
    id: faker.number.int({ min: 1, max: 10000 }),
    name: faker.animal.type().toLowerCase(),
    sprites: {
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${faker.number.int({ min: 1, max: 1010 })}.png`,
      other: {
        showdown: {
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${faker.number.int({ min: 1, max: 1010 })}.gif`,
        },
      },
      ...overrides?.sprites,
    },
    types: [randomType()],
    ...overrides,
  });
};

export const generateFakePokemonListing = (): FormattedPokemon[] =>
  [...Array(24)].map(() => {
    const pokemon = { ...generateFakePokemon() };
    return FormattedPokemonSchema.parse({
      ...pokemon,
      avatarUrl: getPreferredPokemonImage(pokemon),
    } as FormattedPokemon);
  });
