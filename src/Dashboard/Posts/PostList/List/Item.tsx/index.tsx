import type { Post } from "@/types";
import { Link } from "react-router-dom";

const Item = ({ data }: { data: Post }) => {
  return (
    <div className="">
      <div className="">
        <Link to={`/dashboard/posts/edit_post/${data.id}`}>{data.title}</Link>
      </div>
    </div>
  );
};

export default Item;
