"use client";

import { usePosts } from "@/hooks";
import List from "@/components/List";

/**
 * @name Posts 文本内容
 */
const Posts = () => {
  const { data, type } = usePosts();

  return (
    <List>
      {data?.list.map((v) => (
        <List.Item
          key={v.id}
          src={v.icon}
          name={v.title}
          desc={v.description}
          url={`/${type}/${v.id}`}
        />
      ))}
    </List>
  );
};

export default Posts;
