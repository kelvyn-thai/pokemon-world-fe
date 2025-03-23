import { intersectionBy } from "lodash";
import { LIMIT_PER_PAGE } from "@/constants";
import {
  PokemonEntity,
  PokemonEntitySchema,
  PokemonListingResponse,
  PokemonListingResponseSchema,
  PokemonType,
  PokemonTypeEntitySchema,
} from "@/schemas";
import { convertToURLSearchParams } from "@/utils";

export default class PokemonService {
  constructor() {
    //
  }

  async getPokemonList({
    offset,
    limit = LIMIT_PER_PAGE,
    type = "",
  }: {
    offset: number;
    limit: number;
    type?: string;
  }): Promise<PokemonListingResponse> {
    if (type.length > 0) {
      const types = type.split(",");
      const tasks = types.map((type) =>
        fetch(`https://pokeapi.co/api/v2/type/${type}`, {
          next: {
            tags: [`$POKEMON_LISTING_${type}`],
            revalidate: 30,
          },
        })
          .then((res) => res.json())
          .then((res) => PokemonTypeEntitySchema.parse(res)),
      );

      const responses: PokemonType[] = await Promise.all([...tasks]);

      const results = responses
        .map((res) => res.pokemon.map((p) => p.pokemon)) // extract array of Pokémon from each type response
        .reduce((acc, current) => intersectionBy(acc, current, "name"));

      const count = results.length;
      const paginated = results.slice(offset, offset + limit);
      const prevOffset = Math.max(0, offset - limit);
      const nextOffset = offset + limit;

      const response = {
        previous:
          offset === 0
            ? null
            : `https://pokeapi.co/api/v2/pokemon?${convertToURLSearchParams({ offset: prevOffset, limit, type })}`,
        next:
          nextOffset >= count
            ? null
            : `https://pokeapi.co/api/v2/pokemon?${convertToURLSearchParams({ limit, offset: nextOffset, type })}`,
        results: paginated,
        count,
      };
      return response;
    }
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
}

export const pokemonService = new PokemonService();
