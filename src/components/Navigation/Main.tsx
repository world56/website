"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./navigation.module.sass";
import { usePathname } from "next/navigation";

const routes = [
  { url: "/", cnName: "关于我", enName: "Welcome" },
  { url: "/achievements", cnName: "成果", enName: "Achievements" },
  { url: "/notes", cnName: "笔记", enName: "Notes" },
  { url: "/contact", cnName: "与我联系", enName: "Contact" },
];

function check(path: string | null, val: (typeof routes)[0]) {
  return val.url === "/" ? path === "/" : path?.includes(val.url);
}

/**
 * @name MainNavigation 导航-个人主页
 */
const MainNavigation = () => {
  const path = usePathname();
  const [loc, setLoc] = useState<string>();

  useEffect(() => {
    const loc = routes.find((v) => check(path, v))?.enName
    setLoc(loc);
  }, [path]);

  return (
    <nav className={styles.main}>
      <h2>{loc}</h2>
      <ul>
        {routes.map((v) => (
          <Link key={v.url} href={v.url}>
            <li className={v.enName === loc ? styles.select : ""}>{v.cnName}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;
