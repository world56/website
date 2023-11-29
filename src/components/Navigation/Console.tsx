"use client";

import {
  // UserOutlined,
  CoffeeOutlined,
  GlobalOutlined,
  MessageOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import styles from "./navigation.module.sass";
import { usePathname, useRouter } from "next/navigation";

const items = [
  {
    key: "/console",
    label: (
      <>
        <GlobalOutlined /> 基本信息
      </>
    ),
  },
  // {
  //   key: "/individual",
  //   icon: <UserOutlined />,
  //   label: <Link href="/console/resume">个人介绍</Link>,
  // },
  {
    key: "/console/post/achievements",
    label: (
      <>
        <CoffeeOutlined />
        成果
      </>
    ),
  },
  {
    key: "/console/post/notes",
    label: (
      <>
        <ShareAltOutlined />
        笔记
      </>
    ),
  },
  {
    key: "/console/contact",
    label: (
      <>
        <MessageOutlined />
        联系面板
      </>
    ),
  },
];

/**
 * @name ConsoleNavigation 导航-控制台
 */
const Console = () => {
  const path = usePathname()!;
  const router = useRouter();

  function onChange(key: string) {
    router.push(key);
  }

  return (
    <Tabs
      centered
      items={items}
      onChange={onChange}
      defaultActiveKey={path}
      className={styles.console}
    />
  );
};

export default Console;
