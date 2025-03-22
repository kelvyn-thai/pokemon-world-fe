import { z } from "zod";

export const PokemonEntitySchema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    front_default: z.string().url().nullable(),
    other: z
      .object({
        "official-artwork": z
          .object({
            front_default: z.string().url().nullable(),
          })
          .nullable(),
        home: z
          .object({
            front_default: z.string().url().nullable(),
          })
          .nullable(),
        showdown: z
          .object({
            front_default: z.string().url().nullable(),
          })
          .nullable(),
      })
      .nullable(),
  }),
});

export type PokemonEntity = z.infer<typeof PokemonEntitySchema>;
