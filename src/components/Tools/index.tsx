"use client";

import { toast } from "sonner";
import Tooltip from "@/components/Tooltip";
import { useParams, useRouter } from "next/navigation";
import { RollbackOutlined, ShareAltOutlined } from "@ant-design/icons";

interface TypeReadingToolsProps {
  title: string;
}

/**
 * @name ReadingTools 分享链接
 */
const ReadingTools: React.FC<TypeReadingToolsProps> = ({ title }) => {
  const router = useRouter();
  const params = useParams<{ type: string }>();

  function onBack() {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(`/${params!.type}`);
    }
  }

  function onCopy() {
    toast("复制成功", { description: "快去分享吧！" });
    const textarea = document.createElement("textarea");
    textarea.value = `${title}\n${window.location.href}`;
    textarea.style.position = "fixed";
    textarea.style.top = "0px";
    textarea.style.left = "0px";
    textarea.style.width = "1px";
    textarea.style.height = "1px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  return (
    <div className="flex items-center text-lg">
      <Tooltip title="复制链接">
        <ShareAltOutlined
          onClick={onCopy}
          className="block mr-4 md:hover:text-black md:dark:hover:text-white md:mr-3"
        />
      </Tooltip>
      <Tooltip title="返回上页">
        <RollbackOutlined
          onClick={onBack}
          className="block md:hover:text-black md:dark:hover:text-white"
        />
      </Tooltip>
    </div>
  );
};

export default ReadingTools;
