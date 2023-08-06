import styles from "./title.module.sass";

interface TypeTitleProps {
  children?: React.ReactNode;
}

/**
 * @name Title 标题分割
 */
const Title: React.FC<TypeTitleProps> = ({ children }) => (
  <div className={styles.title}>
    <span>{children}</span>
  </div>
);

export default Title;
