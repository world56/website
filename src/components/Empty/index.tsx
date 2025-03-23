"use client";

import { useTranslations } from "next-intl";
import { CoffeeOutlined } from "@ant-design/icons";

interface TypeEmpty {
  height?: number;
}

const Empty: React.FC<TypeEmpty> = ({ height = "100%" }) => {
  const t = useTranslations("common");
  return (
    <div
      style={{ height }}
      className="flex justify-center flex-col items-center select-none"
    >
      <CoffeeOutlined className="text-[32px]" />
      <p className="mt-2">{t("empty")}</p>
    </div>
  );
};

export default Empty;
