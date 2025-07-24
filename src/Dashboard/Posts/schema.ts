import { z } from "zod";
import { type JSONContent } from "@tiptap/core";

export const postSchema = z.object({
  title: z.string().min(3, "Informe um título."),
  content: z.custom<JSONContent>(),
  author: z.string().min(5),
  tags: z.array(z.string()).optional(),
  status: z.enum(["published", "scratch", "trash"]),
});

export type PostSchema = z.infer<typeof postSchema>;
