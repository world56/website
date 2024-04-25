"use client";

import { Tooltip } from "antd";
import styles from "./tools.module.sass";
import { useRouter } from "next/navigation";
import { RollbackOutlined, ShareAltOutlined } from "@ant-design/icons";

/**
 * @name ReadingTools 分享链接
 */
const ReadingTools = () => {
  const router = useRouter();

  function onBack() {
    router.back();
  }

  function onCopy() {
    const textarea = document.createElement('textarea');
    textarea.value = window.location.href;
    textarea.style.position = 'fixed';
    textarea.style.top = '0px';
    textarea.style.left = '0px';
    textarea.style.width = '1px';
    textarea.style.height = '1px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  return (
    <div className={styles.tools}>
      <Tooltip title="复制链接">
        <ShareAltOutlined onClick={onCopy} />
      </Tooltip>

      <Tooltip title="返回上页">
        <RollbackOutlined onClick={onBack} />
      </Tooltip>
    </div>
  );
};

export default ReadingTools;
