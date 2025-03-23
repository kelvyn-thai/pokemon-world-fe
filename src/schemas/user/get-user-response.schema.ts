import { z } from "zod";
import { UserEntitySchema } from "./user.schema";

export const GetUserResponseSchema = UserEntitySchema.pick({
  avatar_url: true,
  name: true,
  bio: true,
  email: true,
});

export type GetUserResponseDTO = z.infer<typeof GetUserResponseSchema>;
