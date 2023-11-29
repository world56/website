import Image from "next/image";
import styles from "./personal.module.sass";

import type { Tag } from "@prisma/client";

interface TypeItemProps
  extends Pick<Tag, "name" | "icon" | "url" | "description"> {
  children?: React.ReactNode;
}

/**
 * @name Item 个人简介标签
 */
const Item: React.FC<TypeItemProps> = ({ icon, name, url, description }) => (
  <li>
    <div className={styles.icon}>
      <Image
        alt="#"
        width={0}
        height={0}
        src={`http://127.0.0.1:3000/${icon}`}
      />
    </div>
    <div className={styles.info}>
      <p>{name}</p>
      {url ? (
        <a target="_blank" href={url} className={styles.hover}>
          {description}
        </a>
      ) : (
        <p >{description}</p>
      )}
    </div>
  </li>
);

export default Item;
