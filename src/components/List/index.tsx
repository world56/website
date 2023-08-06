import Item from "./Item";
import styles from "./list.module.sass";

interface TypeListProps
  extends React.FC<{
    children?: React.ReactNode;
  }> {
  /**
   * @param 单个元素（展示内容）
   */
  Item: typeof Item;
}

/**
 * @name List 内容列表
 */
const List: TypeListProps = ({ children }) => {
  return (
    <div className={styles.list}>
      {children}
      <i style={{ width: "calc(33% - 5px)" }} />
      <i style={{ width: "calc(33% - 5px)" }} />
    </div>
  );
};

List.Item = Item;

export default List;
