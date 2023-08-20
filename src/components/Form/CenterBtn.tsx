import { Button, ButtonProps } from "antd";

/**
 * @name CenterBtn 居中按钮
 */
const CenterBtn: React.FC<ButtonProps> = (props) => (
  <div style={{ textAlign: "center" }}>
    <Button {...props} />
  </div>
);

export default CenterBtn;
