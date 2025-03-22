import { z } from "zod";
import { PokemonListingResponseSchema } from "./pokemon-listing-response.shema";

export type PokemonListing = z.infer<typeof PokemonListingResponseSchema>;
