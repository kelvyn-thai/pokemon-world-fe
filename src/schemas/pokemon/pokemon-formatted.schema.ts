import { z } from "zod";
import { PokemonEntitySchema } from "./pokemon.schema";

export const FormattedPokemonSchema = PokemonEntitySchema.extend({
  avatarUrl: z.string().url(),
});

export type FormattedPokemon = z.infer<typeof FormattedPokemonSchema>;
