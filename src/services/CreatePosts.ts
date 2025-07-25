import { app } from "@/firebase";
import {
  getFirestore,
  addDoc,
  collection,
  DocumentReference,
} from "firebase/firestore";

import { type PostSchema } from "@/Dashboard/Posts/schema";

const CreatePost = async (
  data: PostSchema
): Promise<DocumentReference<PostSchema>> => {
  const storage = getFirestore(app);

  try {
    const docRef = await addDoc(collection(storage, "posts"), {
      ...data,
      publishedAt: new Date(),
    });
    console.log("Post salvo com ID:", docRef.id);
    return docRef as DocumentReference<PostSchema>;
  } catch (error) {
    console.error("Erro ao salvar post:", error);
    throw error;
  }
};

export default CreatePost;
