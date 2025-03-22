import { z } from "zod";

export const PokemonEntitySchema = z.object({
  id: z.number(),
  order: z.number(),
  name: z.string(),
  types: z
    .object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    })
    .array(),
  sprites: z.object({
    front_default: z.string().url(),
    other: z.object({
      showdown: z.object({
        front_default: z.string().url(),
      }),
    }),
  }),
});

export type PokemonEntity = z.infer<typeof PokemonEntitySchema>;
