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
import { usePathname, useRouter } from "next/navigation";

const MENU = [
  {
    title: "基本信息",
    path: "/console",
    icon: <UserOutlined />,
  },
  {
    title: "个人生活",
    path: "/console/post/life",
    icon: <CameraOutlined />,
  },
  {
    title: "学习成果",
    path: "/console/post/achievements",
    icon: <TrophyOutlined />,
  },
  {
    title: "学习笔记",
    path: "/console/post/notes",
    icon: <FileTextOutlined />,
  },
  {
    title: "留言消息",
    path: "/console/contact",
    icon: <MessageOutlined />,
  },
  {
    title: "资源管理",
    path: "/console/resources",
    icon: <PictureOutlined />,
  },
  {
    title: "访问日志",
    path: "/console/logs",
    icon: <DesktopOutlined />,
  },
  {
    title: "修改密码",
    path: "/console/pwd",
    icon: <LockOutlined />,
  },
];

/**
 * @name ConsoleNavigation 导航-控制台
 */
const Console = () => {
  const router = useRouter();
  const path = usePathname()!;

  function onChange(e: React.MouseEvent<HTMLUListElement>) {
    const click = e?.target as HTMLElement;
    const target = click.closest("[data-path]") as HTMLElement;
    if (target?.dataset?.path) {
      router.push(target.dataset.path);
    }
  }

  const routePath = path.split("/").splice(0, 4).join("/");

  return (
    <aside className="w-[250px] h-full px-3 rounded-xl overflow-hidden shadow-custom sticky top-14 select-none bg-white dark:bg-card">
      <div className="flex items-center">
        <div className="p-1 rounded-full inline-block my-4 bg-black/5 dark:bg-[#34363c]">
          <HighlightOutlined className="text-2xl m-1 flex" />
        </div>
        <h3 className="ml-2 font-bold">主页管理</h3>
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
