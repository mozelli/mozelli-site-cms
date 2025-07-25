import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ImagePlus,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import CreatePost from "@/services/CreatePosts";
import { type PostSchema, postSchema } from "../schema";

const NewPost = () => {
  const { register, handleSubmit, setValue } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      author: "João Mozelli Neto",
      status: "scratch",
      tags: [],
    },
  });

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: {
      type: "doc",
      title: "",
      content: [],
    },
  });

  const submit = async (data: PostSchema) => {
    console.log("foi");
    const json = editor?.getJSON();
    data.content = json;
    try {
      await CreatePost(data);
      alert("Publicação salva com sucesso!");
    } catch (error) {
      alert("Erro ao salvar publicação.");
      console.error(error);
    }
    console.log("Conteúdo enviado para o Firebase: ", data.content);
  };

  return (
    <div className="">
      <div className="p-4 border rounded w-full shadow flex">
        <h1 className="text-2xl font-bold text-neutral-700 w-full">
          Novo Post
        </h1>
      </div>

      <div className="w-full mt-4">
        <form className="" onSubmit={handleSubmit(submit)}>
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
              defaultValue="João Mozelli Neto"
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
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-neutral-50 font-medium hover:cursor-pointer mt-2"
          >
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
