import Item from "./Item";
import { cache } from "react";
import Expand from "./Expand";
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
    <aside className="md:w-[300px] md:top-14 md:m-0 m-3 h-full p-5 md:p-[30px] sticky text-center shadow-custom rounded-3xl bg-white dark:bg-card">
      <div className="flex md:block relative">
        {local.icon ? (
          <Image
            alt="#"
            priority
            width={150}
            height={150}
            draggable="false"
            src={`${API_RESOURCE}${local.icon}`}
            className="md:m-auto md:w-[150px] md:h-[150px] w-24 h-24 block rounded-full object-cover"
          />
        ) : null}
        <div className="pl-5 md:pl-0">
          <h1 className="md:my-6 md:text-center text-left my-[14px] text-2xl font-bold">
            {local.name}
          </h1>
          <span className="md:py-[5px] md:px-[10px] rounded-md text-[13px] select-none md:bg-black/[0.06] md:dark:bg-[#2B2B2C]">
            {local.position}
          </span>
        </div>
        <Expand />
      </div>
      <div id='personal' className="md:block hidden">
        <hr className="my-5 md:my-8 border-t border-t-gray-100 dark:border-t-[#272729]" />
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
      </div>
    </aside>
  );
};

export default Personal;
