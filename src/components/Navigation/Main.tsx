"use client";

import Link from "next/link";
import styles from "./navigation.module.sass";
import { usePathname } from "next/navigation";

const routes = [
  { url: "/main", cnName: "关于我", enName: "Welcome" },
  { url: "/main/open", cnName: "开源项目", enName: "Open Source" },
  { url: "/main/share", cnName: "分享", enName: "Share" },
  { url: "/main/contact", cnName: "与我联系", enName: "Contact" },
];

/**
 * @name MainNavigation 导航-个人主页
 */
const MainNavigation = () => {
  const path = usePathname();

  return (
    <nav className={styles.main}>
      <h2>{routes.find((v) => v.url === path)?.enName}</h2>
      <ul>
        {routes.map((v) => (
          <Link key={v.url} href={v.url}>
            <li className={path === v.url ? styles.select : ""}>{v.cnName}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;
