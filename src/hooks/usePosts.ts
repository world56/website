import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import { useRequest } from "ahooks";
import { getPosts } from "@/app/api";

import { ENUM_COMMON } from "@/enum/common";

import type { TypeCommon } from "@/interface/common";

export const POST_TYPE = {
  notes: { TITLE: "分享列表", ENUM: ENUM_COMMON.POST_TYPE.NOTES },
  achievements: { TITLE: "成果", ENUM: ENUM_COMMON.POST_TYPE.ACHIEVEMENTS },
};

/**
 * @name usePosts 帖子列表
 */
export default function usePosts(status?: ENUM_COMMON.STATUS) {
  const params = useParams<{ type: "achievements" | "notes" }>();
  const type = params?.type!;
  const { TITLE, ENUM } = POST_TYPE[type];

  const pathname = usePathname();
  const router = useRouter();
  const search = useSearchParams();

  const [query, setQuery] = useState<TypeCommon.QueryPosts>({
    status,
    type: ENUM,
    pageSize: 9,
    current: Number(search?.get("current")) || 1,
  });

  const hook = useRequest(
    (arg?: typeof query) => {
      const { current } = arg || query;
      const params = new URLSearchParams(search!);
      params.set("current", String(current));
      router.replace(`${pathname}?${params.toString()}`);
      return getPosts(arg || query);
    },
    {
      debounceWait: 100,
      refreshDeps: [query],
    },
  );

  return {
    ...hook,
    type,
    ENUM,
    TITLE,
    query,
    setQuery,
  };
}
