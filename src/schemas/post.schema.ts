import { z } from "zod";

export const PostEntitySchema = z.object({
  id: z.string().nullable(),
  title: z.string().nullable(),
  content: z.string().nullable(),
});

export type PostEntity = z.infer<typeof PostEntitySchema>;
