import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.sass";
import { Tooltip, Upload, message } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";

function beforeUpload(file: RcFile) {
  const IS_IMAGE = ["image/jpeg", "image/png"].includes(file.type);
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
}

/**
 * @name UploadImage 上传文件
 */
const UploadImage: React.FC<TypeUploadImageProps> = ({ value, onChange }) => {
  const [load, setLoad] = useState(false);

  function handleChange(e: UploadChangeParam<UploadFile>) {
    switch (e.file.status) {
      case "uploading":
        return setLoad(true);
      case "done":
        return setLoad(false);
      default:
        return;
    }
  }

  return (
    <Upload
      name="file"
      showUploadList={false}
      className={styles.img}
      onChange={handleChange}
      beforeUpload={beforeUpload}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
      {value ? (
        <Tooltip placement="left" title="点击重新上传">
          <Image src={value} alt="#" style={{ width: "100%" }} />
        </Tooltip>
      ) : (
        <span>{load ? <LoadingOutlined /> : <PlusOutlined />} 点击上传</span>
      )}
    </Upload>
  );
};

export default UploadImage;
