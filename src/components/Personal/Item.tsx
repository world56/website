import Image from "next/image";
import styles from "./index.module.sass";

interface TypeItemProps {
  icon: string;
  title: string;
  children?: React.ReactNode;
}

/**
 * @name Item 个人简介标签
 */
const Item: React.FC<TypeItemProps> = ({icon, title, children }) => (
  <li>
    <div className={styles.icon}>
      <Image src={icon} alt="#" />
    </div>
    <div className={styles.info}>
      <p>{title}</p>
      <p>{children}</p>
    </div>
  </li>
);

export default Item;
