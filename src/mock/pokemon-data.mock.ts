import { faker } from "@faker-js/faker";
import {
  PokemonEntity,
  PokemonEntitySchema,
  FormattedPokemon,
  FormattedPokemonSchema,
} from "@/schemas";
import { PokemonListingResponseSchema } from "@/schemas/pokemon/pokemon-listing-response.shema";
import {
  PokemonTypesFormatted,
  PokemonTypesFormattedSchema,
  PokemonTypesResponse,
} from "@/schemas/pokemon/pokemon-types.schema";

export const generateFakePokemon = (): PokemonEntity => {
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
    order: faker.number.int({ min: 1, max: 999 }),
    sprites: {
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${faker.number.int({ min: 1, max: 1010 })}.png`,
      other: {
        showdown: {
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${faker.number.int({ min: 1, max: 1010 })}.gif`,
        },
      },
    },
    types: [randomType()],
  });
};

export const generateFakePokemonListing = (): FormattedPokemon[] =>
  [...Array(24)].map(() => {
    const pokemon = { ...generateFakePokemon() };
    return FormattedPokemonSchema.parse({
      ...pokemon,
      avatarGifUrl: pokemon.sprites.other.showdown.front_default,
      avatarPngUrl: pokemon.sprites.front_default,
    });
  });

export const generateFakePokemonTypesResponse = (): PokemonTypesResponse => {
  return PokemonListingResponseSchema.parse({
    count: 21,
    next: null,
    previous: null,
    results: [
      {
        name: "normal",
        url: "https://pokeapi.co/api/v2/type/1/",
      },
      {
        name: "fighting",
        url: "https://pokeapi.co/api/v2/type/2/",
      },
      {
        name: "flying",
        url: "https://pokeapi.co/api/v2/type/3/",
      },
      {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
      {
        name: "ground",
        url: "https://pokeapi.co/api/v2/type/5/",
      },
      {
        name: "rock",
        url: "https://pokeapi.co/api/v2/type/6/",
      },
      {
        name: "bug",
        url: "https://pokeapi.co/api/v2/type/7/",
      },
      {
        name: "ghost",
        url: "https://pokeapi.co/api/v2/type/8/",
      },
      {
        name: "steel",
        url: "https://pokeapi.co/api/v2/type/9/",
      },
      {
        name: "fire",
        url: "https://pokeapi.co/api/v2/type/10/",
      },
      {
        name: "water",
        url: "https://pokeapi.co/api/v2/type/11/",
      },
      {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
      {
        name: "electric",
        url: "https://pokeapi.co/api/v2/type/13/",
      },
      {
        name: "psychic",
        url: "https://pokeapi.co/api/v2/type/14/",
      },
      {
        name: "ice",
        url: "https://pokeapi.co/api/v2/type/15/",
      },
      {
        name: "dragon",
        url: "https://pokeapi.co/api/v2/type/16/",
      },
      {
        name: "dark",
        url: "https://pokeapi.co/api/v2/type/17/",
      },
      {
        name: "fairy",
        url: "https://pokeapi.co/api/v2/type/18/",
      },
      {
        name: "stellar",
        url: "https://pokeapi.co/api/v2/type/19/",
      },
      {
        name: "unknown",
        url: "https://pokeapi.co/api/v2/type/10001/",
      },
      {
        name: "shadow",
        url: "https://pokeapi.co/api/v2/type/10002/",
      },
    ],
  } as PokemonTypesResponse);
};

export const generateFakePokemonTypesFormatted = (): PokemonTypesFormatted => {
  const typesResponse = generateFakePokemonTypesResponse();

  return PokemonTypesFormattedSchema.parse({
    ...typesResponse,
    data: typesResponse.results.map((result) => result.name),
  } as PokemonTypesFormatted);
};
