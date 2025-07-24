import { z } from "zod";
import { type JSONContent } from "@tiptap/core";

export const postSchema = z.object({
  title: z.string().min(3, "Informe um título."),
  content: z.custom<JSONContent>(),
});

export type PostSchema = z.infer<typeof postSchema>;
