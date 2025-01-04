import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";
import { DBlocal } from "@/lib/db";
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

const Layout: React.FC<TypeAppEntranceProps> = ({ children }) => (
  <html lang="zh-CN">
    <body>
      <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
      <Toaster position="top-right" richColors expand={false} closeButton />
      <Script src="/lib/player/index.js" strategy="lazyOnload" />
    </body>
  </html>
);

export default Layout;
