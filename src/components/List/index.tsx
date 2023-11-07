import Item from "./Item";
import Image from "next/image";
import styles from "./list.module.sass";

import ICON_EMPTY from "@/assets/empty.svg";

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
  return children ? (
    <div className={styles.list}>
      {children}
      <i style={{ width: "calc(33% - 5px)" }} />
      <i style={{ width: "calc(33% - 5px)" }} />
    </div>
  ) : (
    <div className={styles.empty}>
      <div>
        <Image src={ICON_EMPTY} alt="#" />
        <p>暂无记录</p>
      </div>
    </div>
  );
};

List.Item = Item;

export default List;
