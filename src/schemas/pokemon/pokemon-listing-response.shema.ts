import { z } from "zod";

export const PokemonListingResponseSchema = z.object({
  count: z.number(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z
    .object({
      name: z.string(),
      url: z.string().url(),
    })
    .array(),
});

export type PokemonListingResponse = z.infer<
  typeof PokemonListingResponseSchema
>;
