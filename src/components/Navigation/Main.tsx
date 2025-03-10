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
      { url: "/", cnName: t("aboutMe"), enName: "Welcome" },
      { url: "/life", cnName: t("life"), enName: "My Life" },
      {
        url: "/achievements",
        cnName: t("achievement"),
        enName: "Achievement",
      },
      { url: "/notes", cnName: t("note"), enName: "Notes" },
      { url: "/message", cnName: t("message"), enName: "Message" },
    ],
    [t],
  );

  useEffect(() => {
    setName(
      routes.find((v) => v.url === `/${path?.split("/")?.at(1) || ""}`)?.enName,
    );
  }, [path]);

  return (
    <nav className="md:absolute md:top-[5px] md:h-[65px] w-full z-10 fixed bottom-3 h-[54px] left-0 flex justify-between items-center">
      <h2 className="md:inline hidden ml-6 font-bold text-2xl select-none">
        {name}
      </h2>
      <ul className="md:mr-6 md:shadow-none md:w-max md:items-center h-full rounded-3xl w-full mx-5 flex justify-around items-center bg-white dark:bg-black shadow-light md:dark:bg-transparent">
        {routes.map((v, i) => (
          <Link key={v.url} href={v.url} draggable="false">
            <li
              className={`
              ${i === 0 ? "" : "md:ml-2 ml-0"}
              ${v.enName === name ? "nav-select" : ""}
              py-[6px] px-2 md:py-2 md:px-3 font-medium rounded-full cursor-pointer
              md:hover:text-white md:hover:bg-black md:dark:hover:bg-white md:dark:hover:text-black`}
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
