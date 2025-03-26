"use client";

import { toast } from "sonner";
import { dateToTime } from "@/lib/format";
import Tooltip from "@/components/Tooltip";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";
import { RollbackOutlined, ShareAltOutlined } from "@ant-design/icons";

interface TypePostToolsProps {
  date: Date;
  title: string;
}

/**
 * @name PostTools 功能栏
 */
const PostTools: React.FC<TypePostToolsProps> = ({ date, title }) => {
  const router = useRouter();
  const params = useParams<{ type: string }>();

  const tPost = useTranslations("post");
  const tCommon = useTranslations("common");

  const [time, setTime] = useState<string>();

  function onBack() {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(`/${params!.type}`);
    }
  }

  function onCopy() {
    toast(tPost("copyTitle"), { description: tPost("copyContent") });
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

  useEffect(() => {
    setTime(dateToTime(date));
  }, [date]);

  return (
    <div className="flex justify-between items-center pb-5 mb-6 text-gray-400 border-b border-grey-100">
      <time dateTime={time} className="flex items-center text-[14px]">
        <FieldTimeOutlined className="mr-1" />
        {time}
      </time>
      <div className="flex items-center text-lg">
        <Tooltip title={tPost("copy")}>
          <ShareAltOutlined
            onClick={onCopy}
            className="block mr-4 md:hover:text-black md:dark:hover:text-white md:mr-3"
          />
        </Tooltip>
        <Tooltip title={tCommon("back")}>
          <RollbackOutlined
            onClick={onBack}
            className="block md:hover:text-black md:dark:hover:text-white"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default PostTools;
