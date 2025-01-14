import Item from "./Item";
import { cache } from "react";
import Image from "next/image";
import { DBlocal, prisma } from "@/lib/db";

import { API_RESOURCE } from "@/app/api";

import { ENUM_COMMON } from "@/enum/common";

const requestPerson = cache(async () => {
  const local = DBlocal.get();
  const items = await prisma.tag.findMany({
    where: { type: ENUM_COMMON.TAG.PANEL },
    orderBy: { index: "asc" },
  });
  return { local, items };
});

/**
 * @name Personal 个人信息简介
 */
const Personal = async () => {
  const { local, items } = await requestPerson();

  const length = items.length;

  return (
    <aside className="w-[300px] h-full top-14 mb-8 p-[30px] sticky text-center shadow-custom rounded-3xl bg-white dark:bg-card dark:border">
      {local.icon ? (
        <Image
          alt="#"
          priority
          width={150}
          height={150}
          src={`${API_RESOURCE}${local.icon}`}
          className="m-auto w-[150px] h-[150px] block rounded-full object-cover"
        />
      ) : null}
      <h1 className="my-6 text-2xl font-bold">{local.name}</h1>
      <span className="py-[5px] px-[10px] rounded-md text-[13px] select-none bg-black/[0.06] dark:bg-[#2B2B2C]">
        {local.position}
      </span>
      <hr className="my-8 border-t border-t-gray-100 dark:border-t-[#272729]" />
      <ul className="text-left mt-4">
        {items.map((v, i) => (
          <Item
            key={v.id}
            url={v.url}
            icon={v.icon}
            name={v.name}
            last={i + 1 === length}
            description={v.description}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Personal;
