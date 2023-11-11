import Item from "./Item";
import { Spin } from "antd";
import Image from "next/image";
import styles from "./list.module.sass";

import ICON_EMPTY from "@/assets/empty.svg";

interface TypeListProps
  extends React.FC<{
    loading?: boolean;
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
const List: TypeListProps = ({ loading, children }) =>
  Array.isArray(children) && children.length ? (
    <div className={styles.list}>
      {children}
      <i style={{ width: "calc(33% - 5px)" }} />
      <i style={{ width: "calc(33% - 5px)" }} />
    </div>
  ) : (
    <div className={styles.empty}>
      <div>
        {loading ? (
          <Spin spinning className="loading" />
        ) : (
          <Image src={ICON_EMPTY} alt="#" />
        )}
        {loading ? null : <p>暂无记录</p>}
      </div>
    </div>
  );

List.Item = Item;

export default List;
