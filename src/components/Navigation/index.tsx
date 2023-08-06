"use client";

import Link from "next/link";
import styles from "./navigation.module.sass";
import { usePathname } from "next/navigation";

const routes = [
  { url: "/", cnName: "关于我", enName: "Welcome" },
  { url: "/open", cnName: "开源项目", enName: "Open Source" },
  { url: "/share", cnName: "分享", enName: "Share" },
  { url: "/contact", cnName: "与我联系", enName: "Contact" },
];

/**
 * @name Navigation 导航
 */
const Navigation = () => {
  const path = usePathname();

  return (
    <nav className={styles.nav}>
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

export default Navigation;
