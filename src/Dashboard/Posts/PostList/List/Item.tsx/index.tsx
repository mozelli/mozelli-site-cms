import { Link } from "react-router-dom";
import { type PostSchema } from "@/Dashboard/Posts/schema";

const Item = ({ data }: { data: PostSchema }) => {
  return (
    <div className="">
      <div className="">
        <Link to={`/dashboard/posts/edit_post/${data.id}`}>{data.title}</Link>
      </div>
    </div>
  );
};

export default Item;
