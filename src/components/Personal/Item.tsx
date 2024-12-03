import Link from "next/link";
import Image from "next/image";

import { BASE_URL } from "@/lib/request";

import type { Tag } from "@prisma/client";

interface TypeItemProps
  extends Pick<Tag, "name" | "icon" | "url" | "description"> {
  children?: React.ReactNode;
  last?: boolean;
}

/**
 * @name Item 个人简介标签
 */
const Item: React.FC<TypeItemProps> = ({
  url,
  last,
  name,
  icon,
  description,
}) => (
  <li className={`flex mb-${last ? 0 : 6}`}>
    <div className="w-[46px] h-[46px] bg-black/[0.06] rounded-full flex items-center justify-center">
      <Image alt="#" width={30} height={30} src={`${BASE_URL}${icon}`} />
    </div>
    <div
      className="ml-5 leading-0 truncate"
      style={{ width: "calc(100% - 66px)" }}
    >
      <p className="mt-[5px] text-[13px] truncate text-zinc-600">{name}</p>
      {url ? (
        <Link
          href={url}
          target="_blank"
          className="text-sm display-inherit truncate"
        >
          {description}
        </Link>
      ) : (
        <p className="text-sm truncate">{description}</p>
      )}
    </div>
  </li>
);

export default Item;
