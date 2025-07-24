import { app } from "@/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { type JSONContent } from "@tiptap/react";
import { type PostSchema } from "../schema";

export interface PostData {
  title: String;
  content: JSONContent;
}

export async function getPostById(id: string): Promise<PostSchema | null> {
  const storage = getFirestore(app);
  const docRef = doc(storage, "posts", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as PostSchema;
  } else {
    console.warn("Post não encontrado.");
    return null;
  }
}
