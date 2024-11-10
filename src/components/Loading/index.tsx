import { LoadingOutlined } from "@ant-design/icons";

interface TypeLoadingProps {
  loading?: boolean;
  className?: string;
  height?: number | string;
  children?: React.ReactNode;
}

const Loading: React.FC<TypeLoadingProps> = ({
  loading,
  children,
  className = "",
  height = "100%",
}) => (
  <div style={{ minHeight: height }} className="relative w-full">
    <div className={className}>{children}</div>
    {loading ? (
      <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center flex-col select-none bg-white opacity-75">
        <LoadingOutlined className="text-[30px]" />
        {/* <p className="text-sm mt-4">正在加载</p> */}
      </div>
    ) : null}
  </div>
);

export default Loading;
