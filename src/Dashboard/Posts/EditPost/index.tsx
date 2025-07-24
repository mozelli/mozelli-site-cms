import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { postSchema, type PostSchema } from "../schema";
import { getPostById } from "./getPosts";
import { Button } from "../../../../srccomponents/ui/button";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ImagePlus,
} from "lucide-react";

import { UpdatePost } from "./updatePost";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const postId = id ? id : "";
  const [loading, setLoading] = useState(true);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: {},
    },
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      const post = await getPostById(postId);
      if (post) {
        setValue("title", post.title);
        setValue("content", post.content);
        setValue("author", post.author);
        setValue("status", post.status);
        setValue("tags", post.tags || []);
        editor?.commands.setContent(post.content);
      }
      setLoading(false);
    }
    if (editor) loadPost();
  }, [editor, postId, setValue]);

  useEffect(() => {
    if (!editor) return;

    editor.on("update", () => {
      const json = editor.getJSON();
      setValue("content", json);
    });
  }, [editor, setValue]);

  const onSubmit = async (data: PostSchema) => {
    if (!id) return alert("ID do post não encontrado.");
    try {
      await UpdatePost(id, data);
    } catch (error) {
      console.error("Erro ao atualizar publicação: ", error);
      alert("Erro ao atualziar publicação.");
    }
    alert("Alterações salvas!");
  };

  const rawTags = watch("tags");
  const tags = Array.isArray(rawTags) ? rawTags : [];

  if (loading) return <p className="text-center">Carregando post...</p>;

  return (
    <div className="">
      <div className="p-4 border rounded w-full shadow flex">
        <h1 className="text-2xl font-bold text-neutral-700 w-full">
          Editar post
        </h1>
      </div>

      <div className="w-full mt-4">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <input
              {...register("title")}
              type="text"
              id="title"
              className="font-bold text-3xl outline-none text-neutral-700 p-2"
              placeholder="Título..."
            />
          </div>
          <div className="border rounded-sm p-2 flex gap-2">
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className="hover:cursor-pointer"
            >
              <Bold className="bg-neutral-600 p-1  w-8 rounded text-neutral-50 hover:bg-neutral-700" />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className="hover:cursor-pointer"
            >
              <Italic className="bg-neutral-600 p-1  w-8 rounded text-neutral-50 hover:bg-neutral-700" />
            </button>
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className="hover:cursor-pointer"
            >
              <Heading1 className="bg-neutral-600 p-1  w-8 rounded text-neutral-50 hover:bg-neutral-700" />
            </button>
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className="hover:cursor-pointer"
            >
              <Heading2 className="bg-neutral-600 p-1  w-8 rounded text-neutral-50 hover:bg-neutral-700" />
            </button>
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className="hover:cursor-pointer"
            >
              <Heading3 className="bg-neutral-600 p-1  w-8 rounded text-neutral-50 hover:bg-neutral-700" />
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className="hover:cursor-pointer"
            >
              <List className="bg-neutral-600 p-1  w-8 rounded text-neutral-50 hover:bg-neutral-700" />
            </button>
            <button
              onClick={() => {
                const url = window.prompt("Cole a URL da imagem");
                if (url) {
                  editor?.chain().focus().setImage({ src: url }).run();
                }
              }}
              className="px-2"
              type="button"
            >
              <ImagePlus className="bg-neutral-600 p-1  w-8 rounded text-neutral-50 hover:bg-neutral-700" />
            </button>
          </div>
          <div className="mt-2 border rounded-sm p-2">
            <div className="">
              <EditorContent editor={editor} className="prose prose-neutral" />
            </div>
          </div>
          <div className="mt-2 p-2">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-neutral-700"
            >
              Autor
            </label>
            <input
              {...register("author")}
              type="text"
              id="author"
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mt-2 p-2">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-neutral-700"
            >
              Status
            </label>
            <select
              {...register("status")}
              id="status"
              defaultValue="scratch"
              className="border rounded p-2 w-full"
            >
              <option value="published">Publicado</option>
              <option value="scratch">Rascunho</option>
              <option value="trash">Lixeira</option>
            </select>
          </div>
          <div className="mt-2 p-2">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-neutral-700"
            >
              Tags (separadas por vírgula)
            </label>
            <input
              {...register("tags")}
              type="text"
              id="tags"
              placeholder="ex: react, firebase, blog"
              defaultValue={tags.join(", ")}
              className="border rounded p-2 w-full"
              onBlur={(e) => {
                const value = e.target.value;
                const tagsArray = value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean);
                setValue("tags", tagsArray); // você precisa usar useFormContext ou passar setValue
              }}
            />
          </div>
          <Button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-neutral-50 font-medium hover:cursor-pointer mt-2"
          >
            Salvar alterações
          </Button>
        </form>
      </div>
    </div>
  );
}
