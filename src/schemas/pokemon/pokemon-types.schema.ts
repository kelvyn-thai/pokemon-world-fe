import { z } from "zod";

export const PokemonTypeEntitySchema = z.object({
  id: z.number(),
  name: z.string(),
  pokemon: z
    .object({
      pokemon: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    })
    .array(),
});

export type PokemonType = z.infer<typeof PokemonTypeEntitySchema>;
