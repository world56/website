import Image from "next/image";
import { useState } from "react";
import { toJSON } from "@/utils/filter";
import styles from "./index.module.sass";
import { Tooltip, Upload, message } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";

function beforeUpload(file: RcFile) {
  const IS_IMAGE = ["image/jpeg", "image/png", "image/svg+xml"].includes(
    file.type,
  );
  if (!IS_IMAGE) {
    message.error("仅支持jpg、jpeg、png、svg图片");
  }
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error("图片最大不得超过1MB");
  }
  return IS_IMAGE && isLt1M;
}

const IMAGE_STYLE = {
  width: "100%",
  height: "auto",
};

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
        onChange?.(toJSON(e.file.xhr?.response)?.[0]?.url);
        return setLoad(false);
      default:
        return;
    }
  }

  const url = `http://127.0.0.1:3000/${value}`;

  function getButtonStyle(value?: string) {
    if (textButton) {
      return value ? (
        <Tooltip placement="left" title="点击重新上传">
          <Image
            alt="#"
            src={url}
            width={0}
            height={0}
            style={IMAGE_STYLE}
            className={styles.text}
          />
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
            <Image
              alt="#"
              src={url}
              width={100}
              height={100}
              style={IMAGE_STYLE}
              className={styles.text}
            />
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
      name="files"
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
