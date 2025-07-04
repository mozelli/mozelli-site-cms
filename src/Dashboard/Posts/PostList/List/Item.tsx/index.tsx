import type { Post } from "@/types";

const Item = ({ data }: { data: Post }) => {
  return (
    <div className="">
      <div className="">{data.title}</div>
    </div>
  );
};

export default Item;
