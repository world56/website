"use client";

import Link from "next/link";
import styles from "./navigation.module.sass";
import { usePathname } from "next/navigation";

const routes = [
  { url: "/", cnName: "关于我", enName: "Welcome" },
  { url: "/portfolio", cnName: "作品集", enName: "Portfolio" },
  { url: "/share", cnName: "分享", enName: "Share" },
  { url: "/contact", cnName: "与我联系", enName: "Contact" },
];

/**
 * @name MainNavigation 导航-个人主页
 */
const MainNavigation = () => {
  const path = usePathname();

  function check(val: (typeof routes)[0]) {
    if (val.url === "/" ) {
      return path === '/';
    } else {
      return path.includes(val.url);
    }
  }

  return (
    <nav className={styles.main}>
      <h2>{routes.find(check)?.enName}</h2>
      <ul>
        {routes.map((v) => (
          <Link key={v.url} href={v.url}>
            <li className={check(v) ? styles.select : ""}>{v.cnName}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;
