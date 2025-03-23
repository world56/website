import { createTranslator } from "next-intl";
import { zhCN, zhTW } from "date-fns/locale";

export function checkLanguage(language: any) {
  return ["zh-Hans", "zh-Hant", "en"].includes(language);
}

export function getHtmlLanguage() {
  return document?.getElementsByTagName("html")[0].lang;
}

export default async function getClientI18n() {
  let locale = getHtmlLanguage();
  const messages = await import(`../../language/${locale}.json`);
  return createTranslator({ locale, messages: messages.default });
}

export function getTinymceLanguage() {
  const language = getHtmlLanguage();
  switch (language) {
    case "zh-Hans":
      return { language: "zh_CN", language_url: "/lib/tinymce/langs/zh_CN.js" };
    case "zh-Hant":
      return { language: "zh_TW", language_url: "/lib/tinymce/langs/zh_TW.js" };
    default:
      return {};
  }
}

export function getTimeLanguage() {
  const language = getHtmlLanguage();
  switch (language) {
    case "zh-Hans":
      return zhCN;
    case "zh-Hant":
      return zhTW;
    default:
      return;
  }
}
