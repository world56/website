import { Input, Upload } from "antd";
import styles from "../personal.module.sass";
import { PlusOutlined } from "@ant-design/icons";

const Item = () => {
  return (
    <div className={styles.item}>
      <Upload>
        <div className={styles.upload}>
          <PlusOutlined />
          <p>Upload</p>
        </div>
      </Upload>
      <div className={styles.context}>
        <Input placeholder="请输入名称" />
        <Input placeholder="请输入详情" />
        <Input placeholder="请输入点击跳转链接（选填）" />
      </div>
    </div>
  );
};

export default Item;
