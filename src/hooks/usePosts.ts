import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { getPosts } from "@/app/api";
import { useEffect, useState } from "react";
import { useDebounceEffect, useRequest } from "ahooks";

import { ENUM_COMMON } from "@/enum/common";

import type { TypeCommon } from "@/interface/common";

const TITLE = {
  life: "个人生活",
  notes: "学习笔记",
  achievements: "学习成果",
};

/**
 * @name usePosts 帖子列表
 */
export default function usePosts(status?: ENUM_COMMON.STATUS) {
  const params = useParams<{ type: ENUM_COMMON.POST_TYPE }>();
  const type = params?.type!;
  const title = TITLE[type];

  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const IS_CONSOLE = pathname?.includes("/console");

  const [query, setQuery] = useState<TypeCommon.QueryPosts>({
    type,
    pageSize: IS_CONSOLE ? 25 : 9,
    current: Number(search?.get("current")) || 1,
    status: IS_CONSOLE ? getDefaultStatus() : status,
    title: IS_CONSOLE ? search?.get("title") || undefined : undefined,
  });

  const hook = useRequest(() => getPosts(query), {
    debounceWait: 150,
    refreshDeps: [query],
  });

  function getDefaultStatus() {
    const status = search?.get("status");
    if (["0", "1"].includes(status!)) {
      return Number(status);
    } else {
      return undefined;
    }
  }

  useDebounceEffect(
    () => {
      const { title, current, status } = query;
      const search = new URLSearchParams(location.search);
      title ? search.set("title", title) : search.delete("title");
      current && search.set("current", String(current));
      if (IS_CONSOLE) {
        typeof status === "number"
          ? search.set("status", String(status))
          : search.delete("status");
      }
      router.replace(`${pathname}?${search.toString()}`);
    },
    [query],
    { wait: 500 },
  );

  useEffect(() => {
    const total = hook.data?.total;
    const { current, pageSize } = query;
    if (
      typeof total !== "undefined" &&
      pageSize * current > total &&
      current !== 1
    ) {
      setQuery((v) => ({ ...v, current: 1 }));
    }
  }, [hook.data, query]);

  return {
    ...hook,
    type,
    title,
    query,
    setQuery,
  };
}
