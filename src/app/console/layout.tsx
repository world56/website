import {
  LikeOutlined,
  UserOutlined,
  CoffeeOutlined,
  GlobalOutlined,
  MessageOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import styles from "./console.module.sass";
import StyledComponentsRegistry from "@/lib/AntdRegistry";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "控制台",
  description: "控制台",
};

const items = [
  {
    key: "/",
    icon: <GlobalOutlined />,
    label: <Link href="/console/">网站信息</Link>,
  },
  {
    key: "/personal",
    icon: <UserOutlined />,
    label: <Link href="/console/personal">个人信息面板</Link>,
  },
  {
    key: "/about",
    icon: <LikeOutlined />,
    label: <Link href="/console/about">关于我</Link>,
  },
  {
    key: "/resume",
    icon: <UserOutlined />,
    label: <Link href="/console/resume">我的简历</Link>,
  },
  {
    key: "/open",
    icon: <CoffeeOutlined />,
    label: <Link href="/console/open">开源项目</Link>,
  },
  {
    key: "/share",
    icon: <ShareAltOutlined />,
    label: <Link href="/console/share">分享</Link>,
  },
  {
    key: "/contact",
    icon: <MessageOutlined />,
    label: <Link href="/console/contact">联系面板</Link>,
  },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <main className={styles.console}>
        <Menu items={items} />
        <div className={styles.context}>{children}</div>
      </main>
    </StyledComponentsRegistry>
  );
};

export default Layout;
