import "./globals.css";
import { Toaster } from "sonner";
import { DBlocal } from "@/lib/db";
import { TooltipProvider } from "@/components/ui/tooltip";

export async function generateMetadata() {
  const config = DBlocal.get();
  return {
    title: config.title,
    description: config.description,
    icons: config.favicon
      ? { icon: config.favicon, apple: config.favicon }
      : undefined,
  };
}

interface TypeAppEntranceProps extends Record<"children", React.ReactNode> {}

const Layout: React.FC<TypeAppEntranceProps> = ({ children }) => (
  <html lang="zh-CN">
    <body>
      <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
      <Toaster position="top-right" richColors expand={false} closeButton />
    </body>
  </html>
);

export default Layout;
