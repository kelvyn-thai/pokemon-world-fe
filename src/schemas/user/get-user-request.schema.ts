import { z } from "zod";

export const GetUserRequestSchema = z.object({
  username: z.string(),
});

export type GetUserRequestDTO = z.infer<typeof GetUserRequestSchema>;
