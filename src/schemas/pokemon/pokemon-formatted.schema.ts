import { z } from "zod";
import { PokemonEntitySchema } from "./pokemon.schema";

export const FormattedPokemonSchema = PokemonEntitySchema.extend({
  avatarGifUrl: z.string().url(),
  avatarPngUrl: z.string().url(),
});

export type FormattedPokemon = z.infer<typeof FormattedPokemonSchema>;
