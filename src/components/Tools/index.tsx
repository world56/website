"use client";

import { Tooltip, message } from "antd";
import styles from "./tools.module.sass";
import { useRouter } from "next/navigation";
import { ShareAltOutlined, RollbackOutlined } from "@ant-design/icons";

/**
 * @name ReadingTools 分享链接
 */
const ReadingTools = () => {
  const router = useRouter();

  function onCopy() {
    const { href } = window.location;
    if (document.execCommand("copy")) {
      const input = document.createElement("input");
      input.setAttribute("readonly", "readonly");
      input.setAttribute("value", href);
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    } else {
      navigator.clipboard.writeText(href);
    }
    message.success("链接复制成功，快分享给您的好友吧！");
  }

  function onBack() {
    router.back();
  }

  return (
    <div className={styles.tools}>
      <Tooltip title="返回上页">
        <RollbackOutlined onClick={onBack} />
      </Tooltip>
      <Tooltip title="分享链接">
        <ShareAltOutlined onClick={onCopy} />
      </Tooltip>
    </div>
  );
};

export default ReadingTools;
