import { useState } from "react";
import styles from "./index.module.sass";
import { Tooltip, Upload, message } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";

function beforeUpload(file: RcFile) {
  const IS_IMAGE = ["image/jpeg", "image/png",'image/svg+xml'].includes(file.type);
  if (!IS_IMAGE) {
    message.error("仅支持jpg、jpeg、png、svg图片");
  }
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error("图片最大不得超过1MB");
  }
  return IS_IMAGE && isLt1M;
}

interface TypeUploadImageProps<T = string> {
  readonly value?: T;
  onChange?(value: T): void;
  /** @param textButton 文本样式上传按钮 */
  textButton?: boolean;
  /**
   * @param radius 弧度
   * @description 默认 10px
   */
  radius?: string | number;
}

/**
 * @name UploadImage 上传文件
 */
const UploadImage: React.FC<TypeUploadImageProps> = ({
  value,
  onChange,
  textButton,
  radius = "8px",
}) => {
  const [load, setLoad] = useState(false);

  function handleChange(e: UploadChangeParam<UploadFile>) {
    switch (e.file.status) {
      case "uploading":
        return setLoad(true);
      case "done":
        onChange?.(e.file.xhr?.response);
        return setLoad(false);
      default:
        return;
    }
  }

  function getButtonStyle(value?: string) {
    if (textButton) {
      return value ? (
        <Tooltip placement="left" title="点击重新上传">
          <img alt="#" src={value} className={styles.text} />
        </Tooltip>
      ) : (
        <div className={styles.text}>
          <span>{load ? <LoadingOutlined /> : <PlusOutlined />}点击上传</span>
        </div>
      );
    } else {
      return (
        <div className={styles.circle} style={{ borderRadius: radius }}>
          {value ? (
            <img alt="#" src={value} className={styles.text} />
          ) : (
            <>
              {load ? <LoadingOutlined /> : <PlusOutlined />}
              <span>点击上传</span>
            </>
          )}
        </div>
      );
    }
  }

  return (
    <Upload
      name="file"
      action="/api/upload"
      showUploadList={false}
      onChange={handleChange}
      beforeUpload={beforeUpload}
    >
      {getButtonStyle(value)}
    </Upload>
  );
};

export default UploadImage;
