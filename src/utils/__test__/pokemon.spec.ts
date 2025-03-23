import { generateFakePokemon } from "@/mock";
import { getPreferredPokemonImage } from "@/utils";

describe("Test getPreferredPokemonImage", () => {
  test.each([
    [
      "Should return showdown image available",
      "https://img.pokemon.com/showdown.gif",
      generateFakePokemon({
        sprites: {
          front_default: null,
          other: {
            showdown: {
              front_default: "https://img.pokemon.com/showdown.gif",
            },
            "official-artwork": { front_default: null },
            home: { front_default: null },
          },
        },
      }),
    ],
    [
      "Should return official-artwork used if showdown is missing",
      "https://img.pokemon.com/artwork.png",
      generateFakePokemon({
        sprites: {
          front_default: null,
          other: {
            showdown: { front_default: null },
            "official-artwork": {
              front_default: "https://img.pokemon.com/artwork.png",
            },
            home: { front_default: null },
          },
        },
      }),
    ],
    [
      "Should return home image used if showdown and artwork are missing",
      "https://img.pokemon.com/home.png",
      generateFakePokemon({
        sprites: {
          front_default: null,
          other: {
            showdown: { front_default: null },
            "official-artwork": { front_default: null },
            home: { front_default: "https://img.pokemon.com/home.png" },
          },
        },
      }),
    ],
    [
      "Should fallback to front_default if others are missing",
      "https://img.pokemon.com/front.png",
      generateFakePokemon({
        sprites: {
          front_default: "https://img.pokemon.com/front.png",
          other: {
            showdown: { front_default: null },
            "official-artwork": { front_default: null },
            home: { front_default: null },
          },
        },
      }),
    ],
    [
      "Should return fallback image if all are missing",
      "/pokemon_fallback.webp",
      generateFakePokemon({
        sprites: {
          front_default: null,
          other: {
            showdown: { front_default: null },
            "official-artwork": { front_default: null },
            home: { front_default: null },
          },
        },
      }),
    ],
  ])("%s", (_, expected, pokemon) => {
    expect(getPreferredPokemonImage(pokemon)).toBe(expected);
  });
});
