"use client";

import { Pagination } from "antd";
import { usePosts } from "@/hooks";
import List from "@/components/List";
import styles from "./list.module.sass";

import type { PaginationProps } from "antd";

/**
 * @name Posts 文本内容
 */
const Posts = () => {
  const { type, data, query, loading, setQuery } = usePosts();

  const onChange: PaginationProps["onChange"] = (current, pageSize) => {
    setQuery((s) => ({ ...s, pageSize, current }));
  };

  return (
    <>
      <List loading={loading}>
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
      {data?.total ? (
        <Pagination
          total={data?.total}
          onChange={onChange}
          className={styles.pag}
          current={query.current}
          pageSize={query.pageSize}
        />
      ) : null}
    </>
  );
};

export default Posts;
