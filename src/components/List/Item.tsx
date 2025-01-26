import Link from "next/link";
import Image from "next/image";

import { API_RESOURCE } from "@/app/api";

interface TypeListItemProps {
  /** @param src 封面地址 */
  src: string;
  /** @param name 名称 */
  name: string;
  /** @param desc 简介 */
  desc?: string | null;
  /** @param url 链接 */
  url: string;
  children?: React.ReactNode;
}

/**
 * @name Item 内容列表-单个元素
 * @description 凑合用吧
 */
const Item: React.FC<TypeListItemProps> = ({ src, url, name, desc }) => (
  <li className="text-content md:w-[302px] w-full mb-[10px] p-[10px] rounded-md border border-slate-100 overflow-hidden cursor-pointer hover:shadow-post duration-75 dark:border-[#272729]">
    <Link href={url} draggable="false">
      <figure className="overflow-hidden rounded-md w-full">
        <Image
          alt="#"
          priority
          width={280}
          height={180}
          draggable="false"
          src={`${API_RESOURCE}${src}`}
          className=" w-full h-[180px] object-cover"
        />
      </figure>
      <h2 className="mt-[10px] text-[16px] font-bold truncate">{name}</h2>
      <p className="mt-[4px] truncate text-black/[0.5] dark:text-[#A1A1AA]">
        {desc}
      </p>
    </Link>
  </li>
);

export default Item;
