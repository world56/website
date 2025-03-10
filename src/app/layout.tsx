import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";
import { DBlocal } from "@/lib/db";
import { NextIntlClientProvider } from "next-intl";
import ThemeProvider from "@/components/ThemeProvider";
import { getLocale, getMessages } from "next-intl/server";
import { TooltipProvider } from "@/components/ui/tooltip";

import { API_RESOURCE } from "./api";

export async function generateMetadata() {
  const config = DBlocal.get();
  const favicon = `${API_RESOURCE}${config.favicon}`;
  return {
    title: config.title,
    description: config.description,
    icons: config.favicon ? { icon: favicon, apple: favicon } : undefined,
  };
}

interface TypeAppEntranceProps extends Record<"children", React.ReactNode> {}

const Layout: React.FC<TypeAppEntranceProps> = async ({ children }) => {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
            <Toaster
              richColors
              closeButton
              expand={false}
              position="top-right"
            />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Script src="/lib/player/index.js" strategy="lazyOnload" />
      </body>
    </html>
  );
};

export default Layout;
