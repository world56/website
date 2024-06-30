import { Popconfirm, PopconfirmProps, Typography } from "antd";

interface TypeConfirmButtonProps
  extends Omit<PopconfirmProps, "title" | "onConfirm"> {
  onClick(): void;
}

/**
 * @name ConfirmButton “二次确认” 按钮
 */
const ConfirmButton: React.FC<TypeConfirmButtonProps> = ({
  onClick,
  children,
  ...props
}) => (
  <Popconfirm
    title="警告"
    description="执行后后无法恢复！"
    onConfirm={onClick}
    {...props}
  >
    <Typography.Link type="danger">{children}</Typography.Link>
  </Popconfirm>
);

export default ConfirmButton;
