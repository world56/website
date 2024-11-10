"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const routes = [
  { url: "/", cnName: "关于我", enName: "Welcome" },
  { url: "/life", cnName: "生活", enName: "My Life" },
  { url: "/achievements", cnName: "成果", enName: "Achievements" },
  { url: "/notes", cnName: "笔记", enName: "Notes" },
  { url: "/contact", cnName: "取得联系", enName: "Contact" },
];

function check(path: string | null, val: (typeof routes)[0]) {
  return val.url === "/" ? path === "/" : path?.includes(val.url);
}

const SELECT = { color: "white", background: "black" };

/**
 * @name MainNavigation 导航-个人主页
 */
const MainNavigation = () => {
  const path = usePathname();

  const location = useMemo(
    () => routes.find((v) => check(path, v))?.enName,
    [path],
  );

  return (
    <nav className="w-full h-[65px] absolute top-[5px] left-0 flex justify-between items-center select-none">
      <h2 className="ml-6 font-bold text-2xl">{location}</h2>
      <ul className="mr-6 flex w-max items-center">
        {routes.map((v) => (
          <Link key={v.url} href={v.url}>
            <li
              style={v.enName === location ? SELECT : undefined}
              className="ml-2 py-2 px-3 font-medium hover:bg-black hover:text-white rounded-full cursor-pointer"
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
