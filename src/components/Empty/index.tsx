import { CoffeeOutlined } from "@ant-design/icons";

interface TypeEmpty {
  height?: number;
}

const Empty: React.FC<TypeEmpty> = ({ height = "100%" }) => (
  <div
    style={{ height }}
    className="flex justify-center flex-col items-center select-none"
  >
    <CoffeeOutlined className="text-[32px]" />
    <p className="mt-2">暂无内容</p>
  </div>
);

export default Empty;
