import "./globals.sass";
import { AntdRegistry } from "@ant-design/nextjs-registry";

interface TypeAppEntranceProps extends Record<"children", React.ReactNode> {}

const Layout: React.FC<TypeAppEntranceProps> = ({ children }) => (
  <html lang="cn">
    <body>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default Layout;
