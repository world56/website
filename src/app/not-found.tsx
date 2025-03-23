"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const NotFound = () => {
  const t = useTranslations("hint");
  return (
    <div className="mx-auto absolute left-[50%] top-[50%] ml-[-231px] mt-[-350px] select-none">
      <div className="flex flex-col items-center justify-center p-10">
        <p className="text-9xl font-light mb-1">4 0 4</p>
        <p className="text-3xl font-extralight">PAGE&nbsp; NOT&nbsp; FOUND</p>
        <p className="font-normal my-8 text-gray-500">{t("notFound")}</p>
        <Link className="underline hover:font-medium" href="/">
          {t("notFoundGoBack")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
