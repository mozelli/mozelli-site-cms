import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

//import { saveData } from "./saveData";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../srccomponents/ui/button";
import {
  Save,
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
//import { JSONContent } from '@tiptap/react';

import { app } from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, DocumentReference } from "firebase/firestore";

const postSchema = z.object({
  content: z.any(),
  title: z.string().min(3),
});

type PostData = z.infer<typeof postSchema>;

const NewPost = () => {
  const storage = getFirestore(app);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostData>({
    resolver: zodResolver(postSchema),
  });

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: {
      type: "doc",
      title: "",
      content: [],
    },
  });

  async function savePost(
    data: PostData
  ): Promise<DocumentReference<PostData>> {
    try {
      const docRef = await addDoc(collection(storage, "posts"), data);
      console.log("Post salvo com ID:", docRef.id);
      return docRef as DocumentReference<PostData>;
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      throw error;
    }
  }

  const submit = async (data: PostData) => {
    const teste = editor?.getJSON();
    data.content = teste;
    try {
      await savePost(data);
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
        <Button className="bg-green-700 hover:bg-green-800 text-neutral-50 font-medium hover:cursor-pointer">
          <Save />
          Publicar
        </Button>
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
