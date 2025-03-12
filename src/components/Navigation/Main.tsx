"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

/**
 * @name MainNavigation 导航-个人主页
 */
const MainNavigation = () => {
  const path = usePathname();
  const t = useTranslations("navigation");

  const [name, setName] = useState<string>();

  const routes = useMemo(
    () => [
      { url: "/", menu: t("about"), title: "Welcome" },
      { url: "/life", menu: t("life"), title: "My Life" },
      {
        url: "/projects",
        menu: t("project"),
        title: t("projectTitle"),
      },
      { url: "/notes", menu: t("note"), title: "Notes" },
      { url: "/message", menu: t("message"), title: "Leave a Message" },
    ],
    [t],
  );

  useEffect(() => {
    setName(
      routes.find((v) => v.url === `/${path?.split("/")?.at(1) || ""}`)?.title,
    );
  }, [path]);

  return (
    <nav className="md:absolute md:top-[5px] md:h-[65px] w-full z-10 fixed bottom-3 h-[54px] left-0 flex justify-between items-center">
      <h2 className="md:inline hidden ml-6 font-bold text-2xl select-none">
        {name}
      </h2>
      <ul className="md:mr-5 md:px-0 md:shadow-none md:w-max md:items-center h-full rounded-3xl w-full mx-5 px-[10px] flex justify-between items-center bg-white dark:bg-black shadow-light md:dark:bg-transparent">
        {routes.map((v, i) => (
          <Link key={v.url} href={v.url} draggable="false">
            <li
              className={`
              ${i === 0 ? "" : "md:ml-2 ml-0"}
              ${v.title === name ? "nav-select" : ""}
              py-[0.4rem] px-[0.4rem] md:py-2 md:px-3 font-medium rounded-full cursor-pointer
              md:hover:text-white md:hover:bg-black md:dark:hover:bg-white md:dark:hover:text-black`}
            >
              {v.menu}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;
