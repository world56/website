"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const routes = [
  { url: "/", cnName: "关于我", enName: "Welcome" },
  { url: "/life", cnName: "生活", enName: "My Life" },
  { url: "/achievements", cnName: "成果", enName: "Achievements" },
  { url: "/notes", cnName: "笔记", enName: "Notes" },
  { url: "/contact", cnName: "取得联系", enName: "Contact" },
];

/**
 * @name MainNavigation 导航-个人主页
 */
const MainNavigation = () => {
  const path = usePathname();

  const [name, setName] = useState<string>();

  useEffect(() => {
    setName(
      routes.find((v) => v.url === `/${path?.split("/")?.at(1) || ""}`)?.enName,
    );
  }, [path]);

  return (
    <nav className="w-full h-[65px] absolute top-[5px] left-0 flex justify-between items-center select-none">
      <h2 className="ml-6 font-bold text-2xl">{name}</h2>
      <ul className="mr-6 flex w-max items-center">
        {routes.map((v) => (
          <Link key={v.url} href={v.url} draggable="false">
            <li
              className={`
              ${v.enName === name ? "nav-select" : ""}
              ml-2 py-2 px-3 font-medium rounded-full cursor-pointer
              hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black`}
            >
              {v.cnName}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;
