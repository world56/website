import Link from "next/link";
import Image from "next/image";
import styles from "./list.module.sass";

import type { StaticImageData } from "next/image";

interface TypeListItemProps {
  /** @param src 封面地址 */
  src: StaticImageData;
  /** @param name 名称 */
  name: string;
  /** @param desc 简介 */
  desc: string;
  /** @param url 链接 */
  url: string;
  children?: React.ReactNode;
}

/**
 * @name Item 内容列表-单个元素
 */
const Item: React.FC<TypeListItemProps> = ({ src, url, name, desc }) => {
  return (
    <div className={styles.item}>
      <Link href={url} target="_blank">
        <div>
          <Image src={src} alt="#" />
        </div>
        <h2>{name}</h2>
        <p>{desc}</p>
      </Link>
    </div>
  );
};

export default Item;
