import Link from "next/link";
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
 */
const Item: React.FC<TypeListItemProps> = ({ src, url, name, desc }) => (
  <div className={styles.item}>
    <Link href={url}>
      <div style={{ background: `url(${src}) center` }} />
      <h2>{name}</h2>
      <p>{desc}</p>
    </Link>
  </div>
);

export default Item;
