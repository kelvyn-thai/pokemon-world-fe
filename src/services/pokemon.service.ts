import { LIMIT_PER_PAGE } from "@/constants";
import {
  FormattedPokemon,
  FormattedPokemonSchema,
  PokemonEntity,
  PokemonEntitySchema,
  PokemonListingResponse,
  PokemonListingResponseSchema,
} from "@/schemas";

export default class PokemonService {
  constructor() {
    //
  }

  async getPokemonList({
    offset,
    limit = LIMIT_PER_PAGE,
  }: {
    offset: number;
    limit: number;
  }): Promise<PokemonListingResponse> {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      {
        next: {
          tags: [`$POKEMON_LISTING_${offset}-${limit}`],
          revalidate: 30,
        },
      },
    )
      .then((res) => res.json())
      .then((res) => PokemonListingResponseSchema.parse(res));
  }

  async getFormattedPokemonList({
    limit = LIMIT_PER_PAGE,
    offset = 0,
  }: {
    limit: number;
    offset: number;
  }): Promise<FormattedPokemon[]> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    )
      .then((res) => res.json())
      .then((res) => PokemonListingResponseSchema.parse(res));

    const getPokemonDetailList: PokemonEntity[] = await Promise.all([
      ...response.results.map((r) =>
        fetch(r.url)
          .then((res) => res.json())
          .then((res) => PokemonEntitySchema.parse(res)),
      ),
    ]);

    return getPokemonDetailList.map((pokemon) =>
      FormattedPokemonSchema.parse({
        ...pokemon,
        avatarGifUrl: pokemon.sprites.other.showdown.front_default,
        avatarPngUrl: pokemon.sprites.front_default,
      } as FormattedPokemon),
    );
  }

  async getPokemonByID({ id }: { id: number }): Promise<PokemonEntity> {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/ `)
      .then((res) => res.json())
      .then((res) => PokemonEntitySchema.parse(res));
  }

  async getPokemonByURL({ url }: { url: string }): Promise<PokemonEntity> {
    return fetch(url, {
      next: {
        tags: [`$POKEMON_BY_URL-${url}`],
        revalidate: 30,
      },
    })
      .then((res) => res.json())
      .then((res) => PokemonEntitySchema.parse(res));
  }

  async getPokemonTypesList(): Promise<PokemonListingResponse> {
    return fetch("https://pokeapi.co/api/v2/type/", {
      next: {
        tags: [`$POKEMON_TYPES_LIST-types`],
        revalidate: 3600,
      },
    })
      .then((res) => res.json())
      .then((res) => PokemonListingResponseSchema.parse(res));
  }

  async getPokemonFullInfo({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<{
    pokemonList: PokemonListingResponse;
    pokemonDetailList: PokemonEntity[];
    formattedPokemonList: FormattedPokemon[];
  }> {
    const [pokemonList]: [PokemonListingResponse] = await Promise.all([
      pokemonService.getPokemonList({ offset, limit }),
    ]);

    const pokemonDetailList = await Promise.all([
      ...pokemonList.results.map((result) =>
        pokemonService.getPokemonByURL({ url: result.url }),
      ),
    ]);

    const formattedPokemonList: FormattedPokemon[] = pokemonDetailList.map(
      (p) =>
        ({
          ...p,
          avatarPngUrl: p.sprites.front_default,
          avatarGifUrl: p.sprites.other.showdown.front_default,
        }) as FormattedPokemon,
    );

    return {
      formattedPokemonList,
      pokemonList,
      pokemonDetailList,
    };
  }
}

export const pokemonService = new PokemonService();
