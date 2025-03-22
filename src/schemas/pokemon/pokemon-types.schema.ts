import { z } from "zod";
import { PokemonListingResponseSchema } from "./pokemon-listing-response.shema";

export const PokemonTypesFormattedSchema = PokemonListingResponseSchema.extend({
  data: z.string().array(),
});

export type PokemonTypesFormatted = z.infer<typeof PokemonTypesFormattedSchema>;

export type PokemonTypesResponse = z.infer<typeof PokemonListingResponseSchema>;
