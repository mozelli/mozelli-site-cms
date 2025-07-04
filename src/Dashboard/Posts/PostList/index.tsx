import { Button } from "../../../../srccomponents/ui/button";
import { Plus } from "lucide-react";
import List from "./List";
import { Link } from "react-router-dom";

const PostList = () => {
  return (
    <div className="">
      <div className="p-4 border rounded w-full shadow flex">
        <h1 className="text-2xl font-bold text-neutral-700 w-full">Posts</h1>
        <Link to="/dashboard/posts/newpost">
          <Button className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer">
            <Plus />
            Criar nova publicação
          </Button>
        </Link>
      </div>
      <div className="p-4 border rounded w-full shadow mt-2">
        <List />
      </div>
    </div>
  );
};

export default PostList;
