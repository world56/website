import Item from "./Item";
import { cache } from "react";
import Image from "next/image";
import styles from "./personal.module.sass";
import { DBlocal, prisma } from "@/utils/db";

import { ENUM_COMMON } from "@/enum/common";

export const revalidate = 864000;

const requestPerson = cache(async () => {
  const local = DBlocal.get();
  const items = await prisma.tag.findMany({
    where: { type: ENUM_COMMON.TAG.PERSONAL_PANEL },
    orderBy: { index: "asc" },
  });
  return { local, items };
});

/**
 * @name Personal 个人信息简介
 */
const Personal = async () => {
  const { local, items } = await requestPerson();

  return (
    <div className={styles.personal}>
      <Image
        alt="#"
        width={150}
        height={150}
        src={`http://127.0.0.1:3000/${local.icon}`}
      />
      <h1>{local.name}</h1>
      <span className={styles.post}>{local.position}</span>
      <hr />
      <ul>
        {items.map((v) => (
          <Item
            key={v.id}
            url={v.url}
            icon={v.icon}
            name={v.name || "-"}
            description={v.description}
          />
        ))}
      </ul>
    </div>
  );
};

export default Personal;
