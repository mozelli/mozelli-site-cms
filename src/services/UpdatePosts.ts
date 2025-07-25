import { app } from "@/firebase";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { type PostSchema } from "@/Dashboard/Posts/schema";

const UpdatePost = async (id: string, data: PostSchema): Promise<void> => {
  const storage = getFirestore(app);

  const ref = doc(storage, "posts", id);
  await updateDoc(ref, data);
};

export default UpdatePost;
