import Link from "next/link";
import Image from "next/image";
import styles from "./list.module.sass";

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
  <div className={styles.item}>
    <Link href={url}>
      <Image
        alt="#"
        width={280}
        height={180}
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${src}`}
      />
      <h2>{name}</h2>
      <p>{desc}</p>
    </Link>
  </div>
);

export default Item;
