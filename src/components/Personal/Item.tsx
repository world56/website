import styles from "./personal.module.sass";

interface TypeItemProps {
  /** @param icon 图标 */
  icon: string;
  /** @param Item 名称 */
  title: string;
  children?: React.ReactNode;
}

/**
 * @name Item 个人简介标签
 */
const Item: React.FC<TypeItemProps> = ({ icon, title, children }) => (
  <li>
    <div className={styles.icon}>
      <img src={icon} alt="#" />
    </div>
    <div className={styles.info}>
      <p>{title}</p>
      <p className={styles.hover}>{children}</p>
    </div>
  </li>
);

export default Item;
