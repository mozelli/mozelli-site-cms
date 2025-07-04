import { app } from "@/firebase.tsx";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Item from "./Item.tsx";
import { useEffect, useState } from "react";
import type { Post } from "@/types.ts";

const List = () => {
  const db = getFirestore(app);
  const [posts, setPosts] = useState<(Post & { id: string })[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const snapshot = await getDocs(collection(db, "posts"));
      const lista = snapshot.docs.map((doc) => ({
        ...(doc.data() as Post),
        id: doc.id,
      }));

      setPosts(lista);
    }

    loadPosts();
  }, []);
  return (
    <div className="">
      {posts.map((post) => {
        return <Item key={post.id} data={post} />;
      })}
    </div>
  );
};

export default List;
