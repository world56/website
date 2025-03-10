import { DBlocal } from "@/lib/db";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const language = DBlocal.language();
  return {
    locale: language,
    messages: (await import(`../../language/${language}.json`)).default,
  };
});
