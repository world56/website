"use client";

import { Tooltip } from "antd";
import styles from "./tools.module.sass";
import { useRouter } from "next/navigation";
import { RollbackOutlined } from "@ant-design/icons";

/**
 * @name ReadingTools 分享链接
 */
const ReadingTools = () => {
  const router = useRouter();

  function onBack() {
    router.back();
  }

  return (
    <div className={styles.tools}>
      <Tooltip title="返回上页">
        <RollbackOutlined onClick={onBack} />
      </Tooltip>
    </div>
  );
};

export default ReadingTools;
