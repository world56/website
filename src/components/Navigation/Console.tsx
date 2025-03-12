"use client";

import {
  LockOutlined,
  UserOutlined,
  CameraOutlined,
  TrophyOutlined,
  PictureOutlined,
  MessageOutlined,
  DesktopOutlined,
  FileTextOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

/**
 * @name ConsoleNavigation 导航-控制台
 */
const Console = () => {
  const router = useRouter();
  const path = usePathname()!;

  const t = useTranslations("menu");

  function onChange(e: React.MouseEvent<HTMLUListElement>) {
    const click = e?.target as HTMLElement;
    const target = click.closest("[data-path]") as HTMLElement;
    if (target?.dataset?.path) {
      router.push(target.dataset.path);
    }
  }

  const routePath = path.split("/").splice(0, 4).join("/");

  const MENU = useMemo(
    () => [
      {
        title: t("basic"),
        path: "/console",
        icon: <UserOutlined />,
      },
      {
        title: t("life"),
        path: "/console/post/life",
        icon: <CameraOutlined />,
      },
      {
        title: t("projects"),
        path: "/console/post/projects",
        icon: <TrophyOutlined />,
      },
      {
        title: t("notes"),
        path: "/console/post/notes",
        icon: <FileTextOutlined />,
      },
      {
        title: t("message"),
        path: "/console/message",
        icon: <MessageOutlined />,
      },
      {
        title: t("resource"),
        path: "/console/resources",
        icon: <PictureOutlined />,
      },
      {
        title: t("log"),
        path: "/console/logs",
        icon: <DesktopOutlined />,
      },
      {
        title: t("system"),
        path: "/console/system",
        icon: <LockOutlined />,
      },
    ],
    [t],
  );

  return (
    <aside className="w-[250px] h-full px-3 rounded-xl overflow-hidden shadow-custom sticky top-14 select-none bg-white dark:bg-card">
      <div className="flex items-center">
        <div className="p-1 rounded-full inline-block my-4 bg-black/5 dark:bg-[#34363c]">
          <HighlightOutlined className="text-2xl m-1 flex" />
        </div>
        <h3 className="ml-2 font-bold">{t("title")}</h3>
      </div>
      <hr className="m-auto mb-2 border-t border-t-gray-100 dark:border-t-[#272729]" />
      <ul onClick={onChange}>
        {MENU.map((v) => (
          <li
            key={v.path}
            data-path={v.path}
            className={`
                  ${
                    routePath === v.path
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "hover:bg-black/5 dark:hover:bg-white dark:hover:text-black"
                  }
              flex items-center h-9 px-2 mt-1 mb-2
              text-sm cursor-pointer rounded-xl leading-9
            `}
          >
            {v.icon} &nbsp; {v.title}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Console;
