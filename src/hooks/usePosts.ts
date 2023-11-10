import { useState } from "react";
import { useRequest } from "ahooks";
import { getPosts } from "@/app/api";
import { useParams } from "next/navigation";

import { ENUM_COMMON } from "@/enum/common";

import type { TypeCommon } from "@/interface/common";

export const POST_TYPE = {
  share: { TITLE: "分享列表", ENUM: ENUM_COMMON.POST_TYPE.SHARE },
  portfolio: { TITLE: "作品集", ENUM: ENUM_COMMON.POST_TYPE.PORTFOLIO },
};

/**
 * @name usePosts 帖子列表
 */
export default function usePosts() {
  const { type } = useParams<{ type: "portfolio" | "share" }>();
  const { TITLE, ENUM } = POST_TYPE[type];

  const [query, setQuery] = useState<TypeCommon.QueryPosts>({
    type: ENUM,
    current: 1,
    pageSize: 20,
  });

  const hook = useRequest((arg?: typeof query) => getPosts(arg || query), {
    debounceWait: 100,
  });

  return {
    ...hook,
    type,
    ENUM,
    TITLE,
    query,
    setQuery,
  };
}
