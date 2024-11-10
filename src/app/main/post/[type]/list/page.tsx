"use client";

import { usePosts } from "@/hooks";
import List from "@/components/List";
import PageTurning from "@/components/PageTurning";

import { ENUM_COMMON } from "@/enum/common";

/**
 * @name Posts 文本内容
 */
const Posts = () => {
  const { type, data, query, loading, setQuery } = usePosts(
    ENUM_COMMON.STATUS.ENABLE,
  );

  function onPageTurningChange(current: number) {
    setQuery((v) => ({ ...v, current }));
  }

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
        <PageTurning
          radius
          className="mt-5"
          total={data?.total}
          current={query.current}
          pageSize={query.pageSize}
          onChange={onPageTurningChange}
        />
      ) : null}
    </>
  );
};

export default Posts;
