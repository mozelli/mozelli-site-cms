import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "@/firebase";

import { zodResolver } from "@hookform/resolvers/zod";
import { refEqual } from "firebase/firestore";
import { Button } from "../../../../srccomponents/ui/button";
import { Input } from "../../../../srccomponents/ui/input";
import { Save } from "lucide-react";

import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { useEffect, useState } from "react";

const postSchema = z.object({
  title: z.string().min(3, "Mínimo de 3 caracteres."),
  content: z.string().min(10, "Mínimo de 10 caracteres."),
});

type PostData = z.infer<typeof postSchema>;

const NewPost = () => {
  const [content, setContent] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const navigate = useNavigate();
  const storage = getStorage(app);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostData>({
    resolver: zodResolver(postSchema),
  });

  const handleSaveContent = () => {
    console.log(content);
  };

  const onSubmit = (data: PostData) => {
    //navigate("/dashboard/posts");
  };

  const handleImageUpload = async (files: File[], editor: any) => {
    const file = files[0];
    if (!file) return;
    const storageRef = ref(storage, `posts/${Date.now()}-${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      editor.image.insert(url, null, null, editor.image.get());
    } catch (error) {
      console.error("Erro ao fazer upload: ", error);
    }
  };

  const config = {
    placeholderText: "Escreva aqui...",
    imageUpload: true,
    imageAllowedTypes: ["jpeg", "jpg", "png"],

    events: {
      "image.beforeUpload": function (files: File[]) {
        handleImageUpload(files, this);
        return false;
      },
    },
  };

  return (
    <div className="">
      <div className="p-4 border rounded w-full shadow flex">
        <h1 className="text-2xl font-bold text-neutral-700 w-full">
          Novo Post
        </h1>
        <Link to="/">
          <Button className="bg-green-700 hover:bg-green-800 text-neutral-50 font-medium hover:cursor-pointer">
            <Save />
            Publicar
          </Button>
        </Link>
      </div>

      <div className="w-full mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="">
            <input
              type="text"
              id="title"
              {...register("title")}
              className="font-bold text-3xl outline-none text-neutral-700 p-2"
              placeholder="Título..."
            />
          </div>
          <div className="mt-2">
            {isMounted && (
              <FroalaEditorComponent
                tag="textarea"
                config={config}
                model={content}
                onModelChange={(newContent: string) => {
                  setContent(newContent);
                }}
              />
            )}
          </div>
          <Button onClick={handleSaveContent}>Publicar</Button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
