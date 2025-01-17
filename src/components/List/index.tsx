import Item from "./Item";
import Empty from "@/components/Empty";
import Loading from "@/components/Loading";

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
const List: TypeListProps = ({ loading, children }) => (
  <Loading loading={loading} height={520}>
    {Array.isArray(children) && children.length ? (
      <ul className="flex flex-wrap justify-between">
        {children}
        <li style={{ width: "calc(33% - 5px)" }} />
        <li style={{ width: "calc(33% - 5px)" }} />
      </ul>
    ) : loading ? null : (
      <Empty height={520} />
    )}
  </Loading>
);

List.Item = Item;

export default List;
