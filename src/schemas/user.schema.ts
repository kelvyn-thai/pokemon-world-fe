import { z } from "zod";

export const UserEntitySchema = z.object({
  avatar_url: z.string().url(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  bio: z.string().nullable(),
});

// TypeScript type from Zod schema
export type UserEntity = z.infer<typeof UserEntitySchema>;
