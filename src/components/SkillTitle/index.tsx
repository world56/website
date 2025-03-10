"use client";

import { useTranslations } from "next-intl";

const SkillTitle = () => {
  const t = useTranslations("main");
  return <h2 className="main-title">{t("skill")}</h2>;
};

export default SkillTitle;
